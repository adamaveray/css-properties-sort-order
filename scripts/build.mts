import { name as moduleName } from '../package.json' assert { type: 'json' };
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';

const format = process.argv[2];
if (format == null) {
  throw new Error('Format must be specified.');
}

const lines = readFileSync(resolve('properties-order.txt'), 'utf-8')
  .split('\n')
  .map((line) => line.replace(/\s*#.*$/, '').trim())
  .filter((line) => line.length > 0);

let output: string;
switch (format) {
  case 'json':
    output = JSON.stringify(lines, null, 2);
    break;

  case 'js':
    output = `export default ${JSON.stringify(lines, null, 2)};`;
    break;

  case 'ts':
    output = `module '${moduleName}' {
  export default ${JSON.stringify(lines, null, 2)};
}`;
    break;

  default:
    throw new Error(`Unknown format "${format}".`);
}
process.stdout.write(output);
