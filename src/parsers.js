import yaml from 'js-yaml';
import ini from 'ini';

const getParser = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (ext, content) => getParser[ext](content);
