import yaml from 'js-yaml';

const getParser = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (ext, content) => getParser[ext](content);
