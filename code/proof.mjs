// One entry point for the same public checks used in CI. No private adapter.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--benchmark-output' || !args[1])) {
  console.error('Usage: node proof.mjs [--benchmark-output result.json]');
  process.exit(1);
}
const benchmark = ['benchmarks/edit-safety.mjs'];
if (args.length) benchmark.push('--output', args[1]);
const checks = [
  ['Automated tests', ['--test']],
  ['Working demonstration', ['demo/run.mjs']],
  ['Published file integrity', ['evidence-verifier/verify.mjs', '..', 'benchmarks/portfolio/PUBLICATION_MANIFEST.json']],
  ['Evidence receipt arithmetic', ['evidence-verifier/audit.mjs']],
  ['Editing safety comparison', benchmark],
  ['Evaluation protocol example', ['evaluation-runner/runner.mjs', 'evaluation-runner/example-cases.json', 'evaluation-runner/example-adapter.mjs']],
];
const cwd = fileURLToPath(new URL('./', import.meta.url));
for (const [index, [label, command]] of checks.entries()) {
  console.log(`\n[${index + 1}/${checks.length}] ${label}`);
  const result = spawnSync(process.execPath, command, {
    cwd, stdio: 'inherit', windowsHide: true, timeout: 120000,
  });
  if (result.error || result.status !== 0) {
    console.error(`FAILED: ${label}${result.error ? ` (${result.error.message})` : ''}`);
    process.exit(Number.isInteger(result.status) && result.status > 0 ? result.status : 1);
  }
}
console.log('\nPASS: all six public checks completed. Private core capabilities are outside this command.');
