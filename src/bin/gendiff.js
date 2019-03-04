#!/usr/bin/env node
import program from 'commander';
import { version } from '../../package.json';
import genDiff from '..';

program
  .version(version)
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'recursive')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) =>
    console.log(genDiff(firstConfig, secondConfig, program.format)));

program.parse(process.argv);
