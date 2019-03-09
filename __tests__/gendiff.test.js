import path from 'path';
import fs from 'fs';
import gendiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

test.each([
  ['before.json', 'after.json', 'expectResult'],
  ['before.yml', 'after.yml', 'expectResult'],
  ['before.ini', 'after.ini', 'expectResult'],
  ['before2.json', 'after2.json', 'expectResultDiff'],
  ['before2.yml', 'after2.yml', 'expectResultDiff'],
  ['before2.ini', 'after2.ini', 'expectResultDiff'],
])('Test Diff Output Format(%s, %s)',
  (before, after, expected) => {
    const getCompareResult = gendiff(getFixturePath(before), getFixturePath(after), 'diff');
    const getExpectResult = fs.readFileSync(getFixturePath(expected), 'utf-8');
    expect(getCompareResult).toBe(getExpectResult);
  });

test.each([
  ['before2.json', 'after2.json', 'expectResultPlain'],
  ['before2.yml', 'after2.yml', 'expectResultPlain'],
  ['before2.ini', 'after2.ini', 'expectResultPlain'],
])('Test Plain Output Format(%s, %s)',
  (before, after, expected) => {
    const getCompareResult = gendiff(getFixturePath(before), getFixturePath(after), 'plain');
    const getExpectResult = fs.readFileSync(getFixturePath(expected), 'utf-8');
    expect(getCompareResult).toBe(getExpectResult);
  });

test.each([
  ['before2.json', 'after2.json', 'expectResultJSON'],
  ['before2.yml', 'after2.yml', 'expectResultJSON'],
  ['before2.ini', 'after2.ini', 'expectResultJSON'],
])('Test JSON Output Format(%s, %s)',
  (before, after, expected) => {
    const getCompareResult = gendiff(getFixturePath(before), getFixturePath(after), 'json');
    const getExpectResult = fs.readFileSync(getFixturePath(expected), 'utf-8');
    expect(getCompareResult).toBe(getExpectResult);
  });
