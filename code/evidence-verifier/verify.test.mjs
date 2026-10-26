import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { buildManifest, verifyManifest } from './verify.mjs';

test('detects unchanged, changed, and missing files', async () => {
  const root = await mkdtemp(join(tmpdir(), 'evidence-'));
  await writeFile(join(root, 'a.md'), 'alpha');
  await writeFile(join(root, 'b.md'), 'beta');
  const manifest = await buildManifest(root, ['a.md', 'b.md']);
  manifest.files.push({ path: 'gone.md', bytes: 1, sha256: '0'.repeat(64) });
  await writeFile(join(root, 'b.md'), 'beta, edited');

  const status = Object.fromEntries((await verifyManifest(root, manifest)).map(r => [r.path, r.status]));
  assert.deepEqual(status, { 'a.md': 'ok', 'b.md': 'changed', 'gone.md': 'missing' });
});

test('this repository matches its own publication manifest', async () => {
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const manifest = JSON.parse(await readFile(join(root, 'benchmarks/portfolio/PUBLICATION_MANIFEST.json'), 'utf8'));
  const bad = (await verifyManifest(root, manifest)).filter(r => r.status !== 'ok');
  assert.deepEqual(bad, []);
});

test('every tracked publication file is covered, except the manifest itself', async () => {
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const manifestPath = 'benchmarks/portfolio/PUBLICATION_MANIFEST.json';
  const manifest = JSON.parse(await readFile(join(root, manifestPath), 'utf8'));
  const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
    .split('\0').filter(p => p && p !== manifestPath).sort();
  assert.deepEqual(manifest.files.map(f => f.path).sort(), tracked);
});
