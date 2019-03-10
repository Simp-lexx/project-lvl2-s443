import _ from 'lodash';

const keyPath = (path, key) => (path ? `${path}.${key}` : `${key}`);

const buildValueString = value => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const statusType = {
  removed: (path, a) => `Property '${keyPath(path, a.key)}' was removed`,
  added: (path, a) => `Property '${keyPath(path, a.key)}' was added with value: ${buildValueString(a.value)}`,
  unchanged: () => '',
  changed: (path, a) => `Property '${keyPath(path, a.key)}' was updated. From ${buildValueString(a.valueOld)} to ${buildValueString(a.valueNew)}`,
  haschildren: (path, a, f) => f(a.children, `${keyPath(path, a.key)}`),
};

const stringify = (obj, path) => {
  const result = obj.map(a => statusType[a.type](path, a, stringify));
  return `${result.filter(a => a).join('\n')}`;
};

export default ast => `${stringify(ast, '')}`;
