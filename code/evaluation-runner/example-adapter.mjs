// Public smoke fixture: reverses a JSON array. No learning or private AI code.
import { readFileSync } from 'node:fs';
const { input } = JSON.parse(readFileSync(0,'utf8'));
console.log(JSON.stringify([...input].reverse()));
