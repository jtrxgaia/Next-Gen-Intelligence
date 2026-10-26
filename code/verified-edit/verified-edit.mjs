// Public reference, written from the published contract, not private product source.
import { createHash, randomUUID } from 'node:crypto';
import { open, readFile, writeFile, rename, unlink, realpath } from 'node:fs/promises';

const digest = text => createHash('sha256').update(text).digest('hex');
const cancelled = () => ({ outcome: 'cancelled', receipt: null });
async function readCurrent(file) {
  try { return await readFile(file, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}
async function replace(file, text) {
  const temporary = `${file}.${randomUUID()}.pending`;
  try {
    await writeFile(temporary, text, { flag: 'wx' });
    await rename(temporary, file);
  } finally {
    await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
}
export async function verifiedEdit({ file, produceCandidate, runCheck, signal }) {
  if (signal?.aborted) return cancelled();
  file = await realpath(file);
  // Exclusive creation serializes participants, including separate processes.
  // External editors do not honor this advisory lock. See README.md.
  const lockPath = `${file}.verified-edit.lock`;
  let lock;
  try { lock = await open(lockPath, 'wx'); }
  catch (error) {
    if (error.code === 'EEXIST') return { outcome: 'busy', receipt: null };
    throw error;
  }
  try {
    const baseline = await readFile(file, 'utf8');
    const baselineHash = digest(baseline);
    const candidate = await produceCandidate(baseline);
    if (signal?.aborted) return cancelled();
    if (typeof candidate !== 'string') throw new TypeError('Candidate must be UTF-8 text');
    if (await readCurrent(file) !== baseline) return { outcome: 'conflict-before-write', receipt: null };
    await replace(file, candidate);
    const ownedHash = digest(candidate);
    let check;
    let checkThrew = false;
    try {
      check = await runCheck(file);
      if (!check || typeof check.command !== 'string' || !Number.isInteger(check.exitCode)) {
        throw new TypeError('Check must return a command and integer exitCode');
      }
    } catch (error) {
      checkThrew = true;
      check = { command: null, exitCode: null, error: String(error?.message ?? error) };
    }
    // A deletion is also a competing edit; do not resurrect the file.
    if (await readCurrent(file) !== candidate) return { outcome: 'conflict-after-write', receipt: null, check };
    if (signal?.aborted || checkThrew || check.exitCode !== 0) {
      await replace(file, baseline);
      return {
        outcome: signal?.aborted ? 'cancelled' : checkThrew ? 'check-error-restored' : 'check-failed-restored',
        receipt: null, check,
      };
    }
    return {
      outcome: 'completed',
      receipt: { file, before: baselineHash, after: ownedHash, check: check.command, exitCode: check.exitCode },
      check,
    };
  } finally {
    await lock.close();
    await unlink(lockPath);
  }
}
