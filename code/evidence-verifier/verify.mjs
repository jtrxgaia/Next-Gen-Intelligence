// Checks every file listed in a publication manifest against its recorded
// size and SHA-256. A match proves the bytes are unchanged, not that they are true.
import { createHash } from 'node:crypto';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export async function hashFile(path) {
  return createHash('sha256').update(await readFile(path)).digest('hex');
}

export async function verifyManifest(root, manifest) {
  const results = [];
  for (const entry of manifest.files) {
    const full = join(root, entry.path);
    try {
      const [sha256, info] = await Promise.all([hashFile(full), stat(full)]);
      const ok = sha256 === entry.sha256 && info.size === entry.bytes;
      results.push({ path: entry.path, status: ok ? 'ok' : 'changed' });
    } catch {
      results.push({ path: entry.path, status: 'missing' });
    }
  }
  return results;
}

export async function buildManifest(root, paths, meta = {}) {
  const files = [];
  for (const path of [...paths].sort()) {
    const full = join(root, path);
    files.push({ path, bytes: (await stat(full)).size, sha256: await hashFile(full) });
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
