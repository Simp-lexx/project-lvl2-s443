import renderDiff from './rendererDiff';
import renderPlain from './rendererPlain';
import renderJSON from './rendererJSON';

const renderer = {
  diff: renderDiff,
  plain: renderPlain,
  json: renderJSON,
};

export default (result, format) => renderer[format](result);
