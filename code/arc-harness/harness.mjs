// A fair scorer for ARC-style grid tasks. It encodes the evaluation rules in
// benchmarks/METHODS.md and contains no solver.
//   - the solver never sees test outputs (they are removed before the call)
//   - each test input is solved separately, by a fresh solver, in one attempt
//   - an answer counts only if the whole grid matches exactly
//   - a task passes only if every one of its test inputs passes

export const gridsEqual = (a, b) =>
  Array.isArray(a) && Array.isArray(b) && a.length === b.length &&
  a.every((row, i) => Array.isArray(row) && row.length === b[i].length && row.every((v, j) => v === b[i][j]));

export function withoutAnswers(task) {
  return {
    train: task.train.map(p => ({ input: p.input, output: p.output })),
    test: task.test.map(p => ({ input: p.input })),
  };
}

export async function scoreTask(task, makeSolver) {
  const visible = withoutAnswers(task);
  const results = [];
  for (let i = 0; i < task.test.length; i++) {
    const solver = makeSolver();
    const started = performance.now();
    let prediction = null;
    try {
      prediction = await solver({ train: visible.train, input: visible.test[i].input });
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
  return { passed, total: Object.keys(perTask).length, medianMs: times[Math.floor(times.length / 2)] ?? null, perTask };
}

// Returns the input unchanged. Any real solver has to beat this baseline.
export const identitySolver = () => ({ input }) => input.map(row => [...row]);
