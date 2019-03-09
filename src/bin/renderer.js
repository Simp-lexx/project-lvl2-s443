import _ from 'lodash';

const setIndent = d => '    '.repeat(d);

const buildValueString = (key, value, deep, f) => {
  if (_.isArray(value)) return `${key}: ${f(value, deep + 1)}`;
  if (_.isObject(value)) {
    const valueToString = Object.keys(value).map(a => buildValueString(a, value[a], deep + 1)).join('\n');
    return `${key}: {\n${setIndent(deep + 2)}${valueToString}\n${setIndent(deep + 1)}}`;
  }
  return `${key}: ${value}`;
};

const statusType = {
  removed: (deep, a, f) => `${setIndent(deep)}  - ${buildValueString(a.key, a.value, deep, f)}`,
  added: (deep, a, f) => `${setIndent(deep)}  + ${buildValueString(a.key, a.value, deep, f)}`,
  unchanged: (deep, a, f) => `${setIndent(deep)}    ${buildValueString(a.key, a.value, deep, f)}`,
  changed: (deep, a, f) => [`${setIndent(deep)}  - ${buildValueString(a.key, a.valueOld, deep, f)}`, `${setIndent(deep)}  + ${buildValueString(a.key, a.valueNew, deep, f)}`],
  haschildren: (deep, a, f) => `${setIndent(deep)}    ${buildValueString(a.key, a.children, deep, f)}`,
};

const stringify = (obj, deep) => {
  const result = obj.map(a => statusType[a.type](deep, a, stringify));
  return `{\n${_.flatten(result).join('\n')}\n${setIndent(deep)}}`;
};

export default ast => `${stringify(ast, 0)}`;
