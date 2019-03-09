import _ from 'lodash';

const conditionsToCheck = [
  {
    check: (obj1, obj2, key) => !_.has(obj2, key),
    diff: (obj1, obj2, key) => ({ type: 'removed', key, value: obj1[key] }),
  },
  {
    check: (obj1, obj2, key) => !_.has(obj1, key),
    diff: (obj1, obj2, key) => ({ type: 'added', key, value: obj2[key] }),
  },
  {
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    diff: (obj1, obj2, key) => ({
      // eslint-disable-next-line no-use-before-define
      type: 'haschildren', key, children: buildDiffTree(obj1[key], obj2[key]),
    }),
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

const buildDiffTree = (obj1, obj2) => {
  const jointKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diffTree = jointKeys.map((key) => {
    const { diff } = conditionsToCheck.find(({ check }) => check(obj1, obj2, key));
    return diff(obj1, obj2, key, buildDiffTree);
  });
  return diffTree;
};

export default buildDiffTree;
