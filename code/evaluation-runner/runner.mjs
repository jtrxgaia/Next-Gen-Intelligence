// Public black-box protocol: one fresh Node adapter process per case.
// Expected answers and task IDs are not sent to the adapter's stdin.
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile, realpath } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const fingerprint = bytes => createHash('sha256').update(bytes).digest('hex');
export function exactEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object') return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a) && a.length !== b.length) return false;
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (JSON.stringify(aKeys) !== JSON.stringify(bKeys)) return false;
  return aKeys.every(k => exactEqual(a[k], b[k]));
}

export function invokeAdapter(adapter, input, { timeoutMs = 2000, maxOutputBytes = 65536, cwd } = {}) {
  return new Promise(resolveResult => {
    let settled = false;
    const output = [];
    let bytes = 0;
    let timer;
    const started = performance.now();
    const child = spawn(process.execPath, ['--', adapter], {
      cwd, stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true,
    });
    const finish = (status, value = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolveResult({ status, value, wallMs: performance.now() - started });
    };
    child.once('error', () => finish('process-error'));
    child.stdin.on('error', () => {}); // Early adapter exit is handled by close.
    // Keep draining both streams. Neither stderr nor raw answers enter a report.
    const collect = (chunk, stdout) => {
      bytes += chunk.length;
      if (bytes > maxOutputBytes) { child.kill(); finish('output-limit'); return; }
      if (stdout) output.push(chunk);
    };
    child.stdout.on('data', b => collect(b, true));
    child.stderr.on('data', b => collect(b, false));
    child.once('close', code => {
      if (settled) return;
      if (code !== 0) { finish('process-error'); return; }
      try { finish('ok', JSON.parse(Buffer.concat(output).toString('utf8'))); }
      catch { finish('invalid-json'); }
    });
    timer = setTimeout(() => { child.kill(); finish('timeout'); }, timeoutMs);
    child.stdin.end(JSON.stringify({ input }) + '\n');
  });
}

export async function evaluate({ cases, adapter, timeoutMs = 2000, maxOutputBytes = 65536, cwd }) {
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || !Number.isInteger(maxOutputBytes) || maxOutputBytes < 1) {
    throw new TypeError('Timeout and output limit must be positive integers');
  }
  if (!Array.isArray(cases) || !cases.length || cases.some(c => !c || typeof c !== 'object' || !Object.hasOwn(c,'input') || !Object.hasOwn(c,'expected'))) {
    throw new TypeError('Supply nonempty JSON cases with input and expected fields');
  }
  // Require JSON data, so NaN/undefined/circular structures cannot distort scoring.
  const serialized = JSON.stringify(cases);
  if (!exactEqual(cases, JSON.parse(serialized))) throw new TypeError('Cases must be JSON data');
  adapter = await realpath(adapter);
  const before = await readFile(adapter);
  const rows = [];
  for (let index = 0; index < cases.length; index++) {
    const { input, expected } = cases[index];
    const result = await invokeAdapter(adapter, input, { timeoutMs, maxOutputBytes, cwd });
    rows.push({ index, status: result.status, correct: result.status === 'ok' && exactEqual(result.value, expected), wallMs: result.wallMs });
  }
  const adapterUnchanged = before.equals(await readFile(adapter));
  const times = rows.map(r=>r.wallMs).sort((a,b)=>a-b);
  const n = times.length;
  return {
    schema: 'public.black-box-evaluation.v1', executedAt: new Date().toISOString(),
    runtime: process.version, platform: process.platform,
    adapterSha256: fingerprint(before), casesSha256: fingerprint(serialized), adapterUnchanged,
    passed: rows.filter(r=>r.correct).length, total: rows.length,
    accepted: adapterUnchanged && rows.every(r=>r.correct),
    medianWallMs: n%2 ? times[Math.floor(n/2)] : (times[n/2-1]+times[n/2])/2,
    timeoutMs, maxOutputBytes, rows,
    scope: 'Exact JSON scoring; fresh adapter process per input; process-inclusive timing. No model, cost, network-isolation, independence, dependency-pinning, or generalization claim follows automatically. Raw inputs, answers, local paths, and stderr excluded from this report.',
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const [casesPath, adapter] = process.argv.slice(2);
  if (!casesPath || !adapter) throw new Error('Usage: node runner.mjs cases.json adapter.mjs');
  const report = await evaluate({ cases: JSON.parse(await readFile(casesPath,'utf8')), adapter });
  console.log(JSON.stringify(report,null,2));
  if (!report.accepted) process.exitCode = 1;
}
