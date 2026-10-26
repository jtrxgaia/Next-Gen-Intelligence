// Public single-file reference implementation, independent of QI Core.
// Check a staged candidate before promoting it. Participating editors share a
// lock; observed outside changes are preserved. An unrelated writer that ignores
// the lock can still race the final comparison and rename. See code/README.md.
import { createHash, randomUUID } from 'node:crypto';
import { lstat, open, readFile, realpath, rename, unlink } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';

const digest = value => createHash('sha256').update(value).digest('hex');
const outcome = (name, check = null) => ({ outcome: name, receipt: null, check });

export async function verifiedEdit({ file, produceCandidate, runCheck, signal }) {
  if (typeof produceCandidate !== 'function' || typeof runCheck !== 'function') {
    throw new TypeError('Candidate and check callbacks are required.');
  }
  if (signal?.aborted) return outcome('cancelled');
  const info = await lstat(file);
  if (!info.isFile() || info.isSymbolicLink()) throw new TypeError('A regular source file is required.');
  const target = await realpath(file);
  const lockPath = `${target}.verified-edit.lock`;
  let lock;
  try {
    lock = await open(lockPath, 'wx', 0o600);
  } catch (error) {
    if (error.code === 'EEXIST') return outcome('busy');
    throw error;
  }
  let staged;
  try {
    const baseline = await readFile(target);
    const before = digest(baseline);
    const original = new TextDecoder('utf-8', { fatal: true }).decode(baseline);
    const candidate = await produceCandidate(original);
    if (signal?.aborted) return outcome('cancelled');
    if (typeof candidate !== 'string') throw new TypeError('The candidate must be UTF-8 text.');
    if (digest(await readFile(target)) !== before) return outcome('conflict-before-check');

    // Same directory and extension: relative module imports remain meaningful.
    staged = join(dirname(target), `.${basename(target, extname(target))}.verified-${randomUUID()}${extname(target)}`);
    const handle = await open(staged, 'wx', info.mode & 0o777);
    try {
      await handle.writeFile(candidate, 'utf8');
      await handle.sync();
    } finally {
      await handle.close();
    }
    const after = digest(Buffer.from(candidate, 'utf8'));
    let check;
    try {
      check = await runCheck(staged, { signal });
    } catch {
      return outcome(signal?.aborted ? 'cancelled' : 'check-error');
    }
    if (signal?.aborted) return outcome('cancelled', check);
    if (!check || check.exitCode !== 0 || typeof check.command !== 'string' || !check.command.trim()) {
      return outcome('check-rejected', check);
    }
    if (digest(await readFile(staged)) !== after) return outcome('candidate-changed', check);
    let current;
    try {
      current = await readFile(target);
    } catch (error) {
      if (error.code === 'ENOENT') return outcome('conflict-before-commit', check);
      throw error;
    }
    if (digest(current) !== before) return outcome('conflict-before-commit', check);
    if (signal?.aborted) return outcome('cancelled', check);
    await rename(staged, target);
    staged = null;
    if (digest(await readFile(target)) !== after) return outcome('conflict-after-commit', check);
    return {
      outcome: 'completed',
      receipt: { file: target, before, after, check: check.command, exitCode: 0 },
      check,
    };
  } finally {
    // A process crash leaves the lock for explicit operator inspection.
    try {
      if (staged) await unlink(staged).catch(error => { if (error.code !== 'ENOENT') throw error; });
    } finally {
      await lock.close();
      await unlink(lockPath);
    }
  }
}
