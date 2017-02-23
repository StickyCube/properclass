import React from 'react';
import createComposer from './createComposer.js';

const concat = function (a, b) {
  if (!b) return a || '';
  if (!a) return b || '';
  return `${a} ${b}`;
};

export default function decorator ({ block, element, modifier, options }) {
  let composer = createComposer(block, options);

  if (element) {
    composer = composer.element(element);
  }

  if (modifier) {
    composer = composer.modifier(modifier);
  }

  return WrappedComponent => {
    class WrapperComponent extends React.Component {
      render () {
        return (
          <WrappedComponent
            {...this.props}
            className={concat(this.props.className, composer(this.props))}
            />
        );
      }
    }

    if (WrappedComponent.propTypes) {
      WrapperComponent.propTypes = WrappedComponent.propTypes;
    }

    if (WrappedComponent.defaultProps) {
      WrapperComponent.defaultProps = WrappedComponent.defaultProps;
    }

    return WrapperComponent;
  };
}
