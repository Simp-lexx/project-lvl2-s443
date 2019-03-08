import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const readParseFile = (pathFile) => {
  const getRelFilePath = path.relative('', pathFile);
  const getFileExtension = path.extname(pathFile);
  return { content: fs.readFileSync(getRelFilePath, 'utf-8'), ext: getFileExtension };
};

const conditionsToCheck = [
  {
    check: (obj1, obj2, key) => !_.has(obj1, key),
    diff: (obj1, obj2, key) => ({ type: 'added', key, value: obj2[key] }),
  },
  {
    check: (obj1, obj2, key) => !_.has(obj2, key),
    diff: (obj1, obj2, key) => ({ type: 'removed', key, value: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    diff: (obj1, obj2, key) => ({ type: 'unchanged', key, value: obj2[key] }),
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    diff: (obj1, obj2, key) => ({
      type: 'changed', key, valueOld: obj1[key], valueNew: obj2[key],
    }),
  },
];

const diffToString = (diff) => {
  const strDiff = diff.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return `    ${item.key}: ${item.value}`;
      case 'changed':
        return `  + ${item.key}: ${item.valueNew}\n  - ${item.key}: ${item.valueOld}`;
      case 'removed':
        return `  - ${item.key}: ${item.value}`;
      case 'added':
        return `  + ${item.key}: ${item.value}`;
      default:
        throw new Error('Incorrect diff type');
    }
  }).join('\n');
  return `{\n${strDiff}\n}`;
};

const buildDiffTree = (obj1, obj2) => {
  const jointKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diffTree = jointKeys.map((key) => {
    const { diff } = conditionsToCheck.find(({ check }) => check(obj1, obj2, key));
    return diff(obj1, obj2, key);
  });
  return diffTree;
};

const gendiff = (pathFile1, pathFile2) => {
  const data1 = readParseFile(pathFile1);
  const data2 = readParseFile(pathFile2);
  const obj1 = getParser(data1.ext, data1.content);
  const obj2 = getParser(data2.ext, data2.content);
  return diffToString(buildDiffTree(obj1, obj2));
};

export default gendiff;
