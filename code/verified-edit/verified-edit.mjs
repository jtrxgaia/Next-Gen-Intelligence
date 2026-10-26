// Clean-room reference for the public "verified edit" contract described in
// benchmarks/portfolio/engineering/verified-edit-walkthrough.md.
// Written from that public description only; it is not Dark Matter source.
//
// Rule: a generated edit counts as done only if the real check passed and the
// file still holds the bytes this task wrote. On failure, restore the original,
// but never overwrite a change someone else made in the meantime.
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

const digest = text => createHash('sha256').update(text).digest('hex');

export async function verifiedEdit({ file, produceCandidate, runCheck, signal }) {
  // 1-2. Baseline: remember exactly what this task is allowed to replace.
  const baseline = await readFile(file, 'utf8');
  const baselineHash = digest(baseline);

  // 3. Candidate from whatever route produced it (model, rule, person).
  const candidate = await produceCandidate(baseline);
  if (signal?.aborted) return { outcome: 'cancelled', receipt: null };

  // 4. Conditional write: only if nobody changed the file since the baseline.
  if (digest(await readFile(file, 'utf8')) !== baselineHash) {
    return { outcome: 'conflict-before-write', receipt: null };
  }
  await writeFile(file, candidate);
  const ownedHash = digest(candidate);

  // 5. Real check: a command's exit status, not an opinion.
  const check = await runCheck(file);

  // 6. Read back: does this task still own these bytes?
  const stillOurs = digest(await readFile(file, 'utf8')) === ownedHash;
  if (!stillOurs) return { outcome: 'conflict-after-write', receipt: null, check };

  if (signal?.aborted || check.exitCode !== 0) {
    await writeFile(file, baseline);
    return { outcome: signal?.aborted ? 'cancelled' : 'check-failed-restored', receipt: null, check };
  }

  // 7. Bounded receipt: what changed and what proved it, nothing more.
  return {
    outcome: 'completed',
    receipt: { file, before: baselineHash, after: ownedHash, check: check.command, exitCode: check.exitCode },
    check,
  };
}
