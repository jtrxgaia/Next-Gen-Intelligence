// A fair scorer for ARC-style grid tasks. It encodes the evaluation rules in
// benchmarks/METHODS.md and contains no solver.
//   - the solver never sees test outputs (they are removed before the call)
//   - each test input is solved separately, by a fresh solver, in one attempt
//   - an answer counts only if the whole grid matches exactly
//   - a task passes only if every one of its test inputs passes

export function validGrid(grid) {
  if (!Array.isArray(grid) || grid.length === 0) return false;
  const width = grid[0]?.length;
  if (!Number.isInteger(width) || width < 1) return false;
  for (let i = 0; i < grid.length; i++) {
    if (!Array.isArray(grid[i]) || grid[i].length !== width) return false;
    for (let j = 0; j < width; j++) {
      if (!Number.isInteger(grid[i][j]) || grid[i][j] < 0 || grid[i][j] > 9) return false;
    }
  }
  return true;
}
export const gridsEqual = (a, b) => validGrid(a) && validGrid(b) &&
  a.length === b.length && a.every((row, i) => row.length === b[i].length && row.every((v, j) => v === b[i][j]));

export function withoutAnswers(task) {
  return {
    train: task.train.map(p => ({ input: p.input, output: p.output })),
    test: task.test.map(p => ({ input: p.input })),
  };
}

export async function scoreTask(task, makeSolver) {
  if (!Array.isArray(task?.train) || !Array.isArray(task?.test) || !task.test.length ||
      [...task.train, ...task.test].some(p => !validGrid(p?.input) || !validGrid(p?.output))) {
    throw new TypeError('Task must contain valid grids and at least one test input');
  }
  const visible = withoutAnswers(task);
  const results = [];
  for (let i = 0; i < task.test.length; i++) {
    let solver;
    let creationFailed = false;
    try { solver = makeSolver(); } catch { creationFailed = true; }
    const started = performance.now();
    let prediction = null;
    try {
      if (!creationFailed) prediction = await solver(structuredClone({ train: visible.train, input: visible.test[i].input }));
    } catch {
      // A crash counts as a wrong answer.
    }
    results.push({ correct: gridsEqual(prediction, task.test[i].output), ms: performance.now() - started });
  }
  return { passed: results.every(r => r.correct), results };
}

export async function scoreSet(tasks, makeSolver) {
  const perTask = {};
  const times = [];
  for (const [id, task] of Object.entries(tasks)) {
    const r = await scoreTask(task, makeSolver);
    perTask[id] = r.passed;
    times.push(...r.results.map(x => x.ms));
  }
  times.sort((a, b) => a - b);
  const passed = Object.values(perTask).filter(Boolean).length;
  const middle = Math.floor(times.length / 2);
  const medianMs = !times.length ? null : times.length % 2 ? times[middle] : (times[middle - 1] + times[middle]) / 2;
  return { passed, total: Object.keys(perTask).length, medianMs, perTask };
}

// Returns the input unchanged. Any real solver has to beat this baseline.
export const identitySolver = () => ({ input }) => input.map(row => [...row]);
