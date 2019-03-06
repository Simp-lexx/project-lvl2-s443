#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'recursive')
  .action((data1, data2) => console.log(genDiff(data1, data2, program.format)))
  .parse(process.argv);

if (!process.argv.length) => program.help();
