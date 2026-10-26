// Checks every file listed in a publication manifest against its recorded
// size and SHA-256. A match proves the bytes are unchanged, not that they are true.
import { createHash } from 'node:crypto';
import { readFile, realpath, writeFile } from 'node:fs/promises';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function hashFile(path) {
  return createHash('sha256').update(await readFile(path)).digest('hex');
}

function checkedPath(root, name) {
  if (typeof name !== 'string' || !name || isAbsolute(name) || name.includes('\\') || name.split('/').includes('..')) {
    throw new TypeError('Manifest paths must be relative forward-slash paths within the root.');
  }
  const full = resolve(root, name), rel = relative(resolve(root), full);
  if (!rel || rel === '..' || rel.startsWith('../') || rel.startsWith('..\\') || isAbsolute(rel)) throw new TypeError('Artifact is outside the root.');
  return full;
}

async function artifact(root, name) {
  const actual = await realpath(checkedPath(root, name));
  const rel = relative(root, actual);
  if (rel === '..' || rel.startsWith('../') || rel.startsWith('..\\') || isAbsolute(rel)) throw new TypeError('Artifact resolves outside the root.');
  // Hash and size come from the same read rather than separate observations.
  const bytes = await readFile(actual);
  return { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') };
}

export async function verifyManifest(root, manifest) {
  root = await realpath(root);
  if (!Array.isArray(manifest?.files)) throw new TypeError('Manifest files must be an array.');
  const seen = new Set();
  for (const entry of manifest.files) {
    const full = checkedPath(root, entry.path);
    if (seen.has(full) || !Number.isSafeInteger(entry.bytes) || entry.bytes < 0 || !/^[a-f0-9]{64}$/.test(entry.sha256)) throw new TypeError('Invalid or duplicate manifest entry.');
    seen.add(full);
  }
  const results = [];
  for (const entry of manifest.files) {
    try {
      const actual = await artifact(root, entry.path);
      const ok = actual.sha256 === entry.sha256 && actual.bytes === entry.bytes;
      results.push({ path: entry.path, status: ok ? 'ok' : 'changed' });
    } catch (error) {
      results.push({ path: entry.path, status: error.code === 'ENOENT' ? 'missing' : 'unreadable' });
    }
  }
  return results;
}

export async function buildManifest(root, paths, meta = {}) {
  root = await realpath(root);
  if (new Set(paths.map(name => checkedPath(root, name))).size !== paths.length) throw new TypeError('Duplicate artifact path.');
  const files = [];
  for (const path of [...paths].sort()) {
    files.push({ path, ...await artifact(root, path) });
  }
  return { ...meta, files };
}

// CLI: node verify.mjs <repo-root> <manifest-path> [--write]
if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const [root = '.', manifestPath = 'benchmarks/portfolio/PUBLICATION_MANIFEST.json'] =
    process.argv.slice(2).filter(a => !a.startsWith('--'));
  const manifestFile = join(root, manifestPath);
  const manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
  if (process.argv.includes('--write')) {
    const { files, ...meta } = manifest;
    const rebuilt = await buildManifest(root, files.map(f => f.path), meta);
    await writeFile(manifestFile, JSON.stringify(rebuilt, null, 2) + '\n');
    console.log(`rewrote ${rebuilt.files.length} entries`);
  } else {
    const results = await verifyManifest(root, manifest);
    const bad = results.filter(r => r.status !== 'ok');
    for (const r of bad) console.log(`${r.status.padEnd(8)} ${r.path}`);
    console.log(`${results.length - bad.length}/${results.length} files match the manifest`);
    process.exitCode = bad.length ? 1 : 0;
  }
}
