// A fair scorer for ARC-style grid tasks. It encodes the evaluation rules in
// benchmarks/METHODS.md and contains no solver.
//   - the solver never sees test outputs (they are removed before the call)
//   - each test input is solved separately, by a fresh solver, in one attempt
//   - an answer counts only if the whole grid matches exactly
//   - a task passes only if every one of its test inputs passes

export function isGrid(grid) {
  if (!Array.isArray(grid) || grid.length === 0 || grid.length > 30) return false;
  const width = grid[0]?.length;
  if (!Number.isInteger(width) || width < 1 || width > 30) return false;
  for (let i = 0; i < grid.length; i++) {
    if (!Object.hasOwn(grid, i) || !Array.isArray(grid[i]) || grid[i].length !== width) return false;
    for (let j = 0; j < width; j++) {
      if (!Object.hasOwn(grid[i], j) || !Number.isInteger(grid[i][j]) || grid[i][j] < 0 || grid[i][j] > 9) return false;
    }
  }
  return true;
}

export function gridsEqual(a, b) {
  if (!isGrid(a) || !isGrid(b) || a.length !== b.length || a[0].length !== b[0].length) return false;
  for (let i = 0; i < a.length; i++) for (let j = 0; j < a[i].length; j++) {
    if (a[i][j] !== b[i][j]) return false;
  }
  return true;
}

function validateTask(task) {
  if (!task || !Array.isArray(task.train) || task.train.length === 0 || !Array.isArray(task.test) || task.test.length === 0) {
    throw new TypeError('A task needs training pairs and at least one test input.');
  }
  for (const pair of [...task.train, ...task.test]) {
    if (!isGrid(pair?.input) || !isGrid(pair?.output)) throw new TypeError('Task grids must be dense rectangular integer grids with colors 0–9 and size 1–30.');
  }
}

export function withoutAnswers(task) {
  return structuredClone({
    train: task.train.map(p => ({ input: p.input, output: p.output })),
    test: task.test.map(p => ({ input: p.input })),
  });
}

export async function scoreTask(task, makeSolver) {
  validateTask(task);
  const visible = withoutAnswers(task);
  const results = [];
  for (let i = 0; i < task.test.length; i++) {
    const started = performance.now();
    let prediction = null;
    try {
      const solver = makeSolver();
      prediction = await solver(structuredClone({ train: visible.train, input: visible.test[i].input }));
    } catch {
      // A crash counts as a wrong answer.
    }
    results.push({ correct: gridsEqual(prediction, task.test[i].output), ms: performance.now() - started });
  }
  return { passed: results.every(r => r.correct), results };
}

export async function scoreSet(tasks, makeSolver) {
  const perTask = Object.create(null);
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
