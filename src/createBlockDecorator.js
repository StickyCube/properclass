import decorator from './decorator.js';

const createDecorator = function ({ blockName, elementName, opts = {} }) {
  return (decoratorOptions = {}) => WrappedComponent => {
    const { element, modifier, options = {} } = decoratorOptions;
    return decorator({
      block: blockName,
      element: element || elementName,
      modifier,
      options: { ...options, ...opts }
    })(WrappedComponent);
  };
};

export default function createBlockDecorator (blockName, opts = {}) {
  const blockDecorator = createDecorator({ blockName, opts });

  blockDecorator.element = function (elementName) {
    return createDecorator({ blockName, elementName, opts });
  };

  return blockDecorator;
}
