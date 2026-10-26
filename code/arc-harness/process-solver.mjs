// A public JSON subprocess boundary. This is process isolation, not an OS
// security sandbox: the executable keeps the invoking user's access rights.
import { spawn } from 'node:child_process';

export function runJsonProcess({ command, args = [], input, timeoutMs = 5000, maxOutputBytes = 65536, signal, cwd }) {
  if (typeof command !== 'string' || !command || !Array.isArray(args) || args.some(x => typeof x !== 'string')) {
    throw new TypeError('Provide an executable and an array of arguments.');
  }
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 60000 ||
      !Number.isSafeInteger(maxOutputBytes) || maxOutputBytes < 1 || maxOutputBytes > 1048576) {
    throw new RangeError('Process bounds are outside the supported range.');
  }
  const payload = JSON.stringify(input) + '\n';
  if (Buffer.byteLength(payload) > 1048576) throw new RangeError('Input exceeds 1 MiB.');
  return new Promise((resolve, reject) => {
    const fail = code => Object.assign(new Error(code), { code });
    if (signal?.aborted) { reject(fail('PROCESS_CANCELLED')); return; }
    const child = spawn(command, args, { cwd, shell: false, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    let reason = null, bytes = 0, chunks = [];
    const stop = code => { reason ??= code; child.kill('SIGKILL'); };
    const timer = setTimeout(() => stop('PROCESS_TIMEOUT'), timeoutMs);
    const abort = () => stop('PROCESS_CANCELLED');
    signal?.addEventListener('abort', abort, { once: true });
    const capture = (chunk, stdout) => {
      bytes += chunk.length;
      if (bytes > maxOutputBytes) { stop('PROCESS_OUTPUT_LIMIT'); return; }
      if (stdout) chunks.push(chunk);
    };
    child.stdout.on('data', b => capture(b, true));
    child.stderr.on('data', b => capture(b, false));
    child.on('error', () => { reason ??= 'PROCESS_START'; });
    // EPIPE is settled by close/exit rather than becoming an unhandled event.
    child.stdin.on('error', () => {});
    child.on('close', code => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      if (reason) { reject(fail(reason)); return; }
      if (code !== 0) { reject(fail('PROCESS_EXIT')); return; }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(fail('PROCESS_JSON'));
      }
    });
    child.stdin.end(payload);
  });
}

// Each solve starts a fresh process. The scorer supplies only visible data.
export const processSolver = options => () => input => runJsonProcess({ ...options, input });
