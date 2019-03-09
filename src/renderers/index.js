import renderDiff from './rendererDiff';
import renderPlain from './rendererPlain';

const renderer = {
  diff: renderDiff,
  plain: renderPlain,
};

export default (result, format) => renderer[format](result);
