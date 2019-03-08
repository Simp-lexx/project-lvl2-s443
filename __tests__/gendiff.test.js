import path from 'path';
import fs from 'fs';
import gendiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

test('Test JSON differences', () => {
  const getCompareResult = gendiff(getFixturePath('before.json'), getFixturePath('after.json'));
  const getExpectResult = fs.readFileSync(getFixturePath('expectResult'), 'utf-8');
  expect(getCompareResult).toBe(getExpectResult);
});

test('Test YAML differences', () => {
  const getCompareResult = gendiff(getFixturePath('before.yml'), getFixturePath('after.yml'));
  const getExpectResult = fs.readFileSync(getFixturePath('expectResult'), 'utf-8');
  expect(getCompareResult).toBe(getExpectResult);
});
