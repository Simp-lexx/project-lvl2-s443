import path from 'path';
import fs from 'fs';
import gendiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

test.each([
  ['before.json', 'after.json', 'expectResult'],
  ['before.yml', 'after.yml', 'expectResult'],
  ['before.ini', 'after.ini', 'expectResult'],
  ['before2.json', 'after2.json', 'expectResult2'],
  ['before2.yml', 'after2.yml', 'expectResult2'],
  ['before2.ini', 'after2.ini', 'expectResult2'],
])('.getDifference(%s, %s)',
  (before, after, expected) => {
    const getCompareResult = gendiff(getFixturePath(before), getFixturePath(after));
    const getExpectResult = fs.readFileSync(getFixturePath(expected), 'utf-8');
    expect(getCompareResult).toBe(getExpectResult);
  });
