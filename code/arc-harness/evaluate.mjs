import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { scoreSet } from './harness.mjs';
import { processSolver } from './process-solver.mjs';

const { values } = parseArgs({ options: {
  tasks: { type: 'string' }, adapter: { type: 'string' }, timeout: { type: 'string', default: '5000' },
} });
if (!values.tasks || !values.adapter) {
  console.error('Usage: node arc-harness/evaluate.mjs --tasks <tasks.json> --adapter <adapter.mjs> [--timeout 5000]');
  process.exitCode = 2;
} else {
  const timeoutMs = Number(values.timeout);
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000) throw new RangeError('Timeout must be 1–60000 ms.');
  const taskBytes = await readFile(resolve(values.tasks));
  const adapter = resolve(values.adapter), adapterBytes = await readFile(adapter);
  const tasks = JSON.parse(taskBytes.toString('utf8'));
  if (!tasks || Array.isArray(tasks) || typeof tasks !== 'object' || !Object.keys(tasks).length) throw new TypeError('Provide a nonempty object of task IDs and tasks.');
  const scored = await scoreSet(tasks, processSolver({ command: process.execPath, args: [adapter], timeoutMs }));
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  console.log(JSON.stringify({
    schema: 'portfolio.black-box-evaluation.v1',
    runtime: process.version,
    tasksetSHA256: hash(taskBytes), adapterSHA256: hash(adapterBytes),
    attemptsPerInput: 1, timeoutMs, ...scored,
    timingScope: 'Wall time per fresh adapter process, including process startup and JSON transport.',
    isolationScope: 'Answers withheld from JSON requests. Separate process with inherited OS permissions; evaluator controls filesystem and network isolation.',
  }, null, 2));
}
