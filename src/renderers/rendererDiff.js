import _ from 'lodash';

const setIndent = d => '    '.repeat(d);

const buildValueString = (key, value, depth, f) => {
  if (_.isArray(value)) return `${key}: ${f(value, depth + 1)}`;
  if (_.isObject(value)) {
    const valueToString = Object.keys(value).map(a => buildValueString(a, value[a], depth + 1)).join('\n');
    return `${key}: {\n${setIndent(depth + 2)}${valueToString}\n${setIndent(depth + 1)}}`;
  }
  return `${key}: ${value}`;
};

const statusType = {
  removed: (depth, a, f) => `${setIndent(depth)}  - ${buildValueString(a.key, a.value, depth, f)}`,
  added: (depth, a, f) => `${setIndent(depth)}  + ${buildValueString(a.key, a.value, depth, f)}`,
  unchanged: (depth, a, f) => `${setIndent(depth)}    ${buildValueString(a.key, a.value, depth, f)}`,
  changed: (depth, a, f) => [`${setIndent(depth)}  - ${buildValueString(a.key, a.valueOld, depth, f)}`, `${setIndent(depth)}  + ${buildValueString(a.key, a.valueNew, depth, f)}`],
  haschildren: (deep, a, f) => `${setIndent(deep)}    ${buildValueString(a.key, a.children, deep, f)}`,
};

const stringify = (obj, depth) => {
  const result = obj.map(a => statusType[a.type](depth, a, stringify));
  return `{\n${_.flatten(result).join('\n')}\n${setIndent(depth)}}`;
};

export default ast => `${stringify(ast, 0)}`;
