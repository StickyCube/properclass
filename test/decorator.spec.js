/* global describe before it */

import React, { Component } from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { decorator as properclass } from '../src/index.js';

@properclass({ block: 'Egg' })
class Egg extends Component {
  render () {
    return (
      <div {...this.props} />
    );
  }
}

@properclass({
  block: 'Egg',
  element: 'yolk',
  modifier: { runny: props => props.isRunny } }
)
class Yolk extends Component {
  render () {
    return (
      <div {...this.props} />
    );
  }
}

describe('Rendering Egg component with no props', () => {
  let renderer = null;
  let result = null;

  before(function () {
    renderer = ReactTestUtils.createRenderer();
    renderer.render(<Egg />);
    result = renderer.getRenderOutput();
  });

  it('Shoild have no only the block className', () => {
    expect(result.props.className).to.eql('Egg');
  });
});

describe('Rendering Egg Component with className on props', () => {
  let renderer = null;
  let result = null;

  before(function () {
    renderer = ReactTestUtils.createRenderer();
    renderer.render(<Egg className='Big' />);
    result = renderer.getRenderOutput();
  });

  it('Should preserve className already on props', () => {
    expect(result.props.className).to.eql('Big Egg');
  });
});

describe('Rendering Yolk component without modifier', () => {
  let renderer = null;
  let result = null;

  before(function () {
    renderer = ReactTestUtils.createRenderer();
    renderer.render(<Yolk />);
    result = renderer.getRenderOutput();
  });

  it('Should have only block__element classNames', () => {
    expect(result.props.className).to.eql('Egg__yolk');
  });
});

describe('Rendering Yolk component with modifier', () => {
  let renderer = null;
  let result = null;

  before(function () {
    renderer = ReactTestUtils.createRenderer();
    renderer.render(<Yolk isRunny />);
    result = renderer.getRenderOutput();
  });

  it('Should have block__element and modifier classNames', () => {
    expect(result.props.className).to.eql('Egg__yolk Egg__yolk--runny');
  });
});
