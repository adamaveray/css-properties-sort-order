import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

const lines = readFileSync(resolve('properties-order.txt'), 'utf-8')
  .split('\n')
  .map((line) => line.replace(/\s*#.*$/, '').trim())
  .filter((line) => line.length > 0);

const json = JSON.stringify(lines, null, 2);

process.stdout.write(json);
