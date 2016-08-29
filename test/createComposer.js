/* global describe it */

import { createComposer } from '../src/index.js';
import { expect } from 'chai';

describe('Default options', () => {
  const eggComposer = createComposer('Egg');
  const yolkComposer = eggComposer.element('yolk');
  const whiteComposer = eggComposer.element('white');

  it('Should return the block name class only', () => {
    const actual = eggComposer();
    const expected = 'Egg';
    expect(actual).to.eql(expected);
  });

  it('Should return the yolk element name only', () => {
    const actual = yolkComposer();
    const expected = 'Egg__yolk';
    expect(actual).to.eql(expected);
  });

  it('Should return the white element name only', () => {
    const actual = whiteComposer();
    const expected = 'Egg__white';
    expect(actual).to.eql(expected);
  });

  it('Should allow modifiers to be specified by string', () => {
    const runnyComposer = yolkComposer.modifier('runny');
    const actual = runnyComposer();
    const expected = 'Egg__yolk Egg__yolk--runny';
    expect(actual).to.eql(expected);
  });

  it('Should allow modifiers to be specified by array', () => {
    const runnyComposer = yolkComposer.modifier(['runny', 'yellow']);
    const actual = runnyComposer();
    const expected = 'Egg__yolk Egg__yolk--runny Egg__yolk--yellow';
    expect(actual).to.eql(expected);
  });

  it('Should allow modifiers to be specified by object', () => {
    const runnyComposer = yolkComposer.modifier({ runny: true, color: 'yellow' });
    const actual = runnyComposer();
    const expected = 'Egg__yolk Egg__yolk--runny Egg__yolk--color-yellow';
    expect(actual).to.eql(expected);
  });

  it('Should use the return values of functions in modifiers object', () => {
    const runnyComposer = yolkComposer.modifier({
      runny: props => props.isRunny,
      broken: props => props.isBroken,
      color: props => props.color
    });
    const actual = runnyComposer({ isRunny: false, isBroken: true, color: 'green' });
    const expected = 'Egg__yolk Egg__yolk--broken Egg__yolk--color-green';
    expect(actual).to.eql(expected);
  });

  it('Should correctly map number modifiers', () => {
    const numberComposer = eggComposer.modifier({
      foo: props => props.foo,
      bar: props => props.bar,
      baz: props => props.baz
    });

    const actual = numberComposer({ foo: 0, bar: -10, baz: 10 });
    const expected = 'Egg Egg--foo-0 Egg--bar--10 Egg--baz-10';
    expect(actual).to.eql(expected);
  });

  it('Should treat empty strings as falsy', () => {
    const stringComposer = eggComposer.modifier({ foo: '', bar: props => props.bar });
    const actual = stringComposer({ bar: '' });
    const expected = 'Egg';
    expect(actual).to.eql(expected);
  });
});

describe('elements of a block should not inherit mofifiers', () => {
  const eggComposer = createComposer('Egg').modifier({ size: props => props.size });
  const yolkComposer = eggComposer.element('yolk').modifier({ runny: props => props.isRunny });

  it('Should only apply size modifier to Egg', () => {
    const actual = eggComposer({ size: 'big', isRunny: true });
    const expected = 'Egg Egg--size-big';
    expect(actual).to.eql(expected);
  });

  it('Should only apply runny modifier to Egg__yolk', () => {
    const actual = yolkComposer({ size: 'big', isRunny: true });
    const expected = 'Egg__yolk Egg__yolk--runny';
    expect(actual).to.eql(expected);
  });
});

describe('Using custom separators', () => {
  const eggComposer = createComposer('Egg', {
    elementSeparator: '--',
    modifierSeparator: '__',
    modifierValueSeparator: '_'
  });
  const yolkComposer = eggComposer.element('yolk');
  const whiteComposer = eggComposer.element('white');

  it('Should return the block name class only', () => {
    const actual = eggComposer();
    const expected = 'Egg';
    expect(actual).to.eql(expected);
  });

  it('Should return the yolk element name only', () => {
    const actual = yolkComposer();
    const expected = 'Egg--yolk';
    expect(actual).to.eql(expected);
  });

  it('Should return the white element name only', () => {
    const actual = whiteComposer();
    const expected = 'Egg--white';
    expect(actual).to.eql(expected);
  });

  it('Should allow modifiers to be specified by string', () => {
    const runnyComposer = yolkComposer.modifier('runny');
    const actual = runnyComposer();
    const expected = 'Egg--yolk Egg--yolk__runny';
    expect(actual).to.eql(expected);
  });

  it('Should allow modifiers to be specified by array', () => {
    const runnyComposer = yolkComposer.modifier(['runny', 'yellow']);
    const actual = runnyComposer();
    const expected = 'Egg--yolk Egg--yolk__runny Egg--yolk__yellow';
    expect(actual).to.eql(expected);
  });

  it('Should allow modifiers to be specified by object', () => {
    const runnyComposer = yolkComposer.modifier({ runny: true, color: 'yellow' });
    const actual = runnyComposer();
    const expected = 'Egg--yolk Egg--yolk__runny Egg--yolk__color_yellow';
    expect(actual).to.eql(expected);
  });

  it('Should use the return values of functions in modifiers object', () => {
    const runnyComposer = yolkComposer.modifier({
      runny: props => props.isRunny,
      broken: props => props.isBroken,
      color: props => props.color
    });
    const actual = runnyComposer({ isRunny: false, isBroken: true, color: 'green' });
    const expected = 'Egg--yolk Egg--yolk__broken Egg--yolk__color_green';
    expect(actual).to.eql(expected);
  });
});

describe('Using a styleMap to transform generated classNames', () => {
  const styleMapObj = {
    'Egg': 'Foo',
    'Egg__yolk': 'FooBar',
    'Egg__yolk--runny': 'FooBarBaz'
  };

  const styleMapFn = className => styleMapObj[className] + '_abc';

  describe('Using an object', () => {
    const eggComposer = createComposer('Egg', { styleMap: styleMapObj });
    const yolkComposer = eggComposer.element('yolk');
    const runnyComposer = yolkComposer.modifier('runny');

    it('Should map the block correctly', () => {
      const actual = eggComposer();
      const expected = 'Foo';
      expect(actual).to.eql(expected);
    });

    it('Should map the element correctly', () => {
      const actual = yolkComposer();
      const expected = 'FooBar';
      expect(actual).to.eql(expected);
    });

    it('Should map the element modifier correctly', () => {
      const actual = runnyComposer();
      const expected = 'FooBar FooBarBaz';
      expect(actual).to.eql(expected);
    });
  });

  describe('Using a function', () => {
    const eggComposer = createComposer('Egg', { styleMap: styleMapFn });
    const yolkComposer = eggComposer.element('yolk');
    const runnyComposer = yolkComposer.modifier('runny');

    it('Should map the block correctly', () => {
      const actual = eggComposer();
      const expected = 'Foo_abc';
      expect(actual).to.eql(expected);
    });

    it('Should map the element correctly', () => {
      const actual = yolkComposer();
      const expected = 'FooBar_abc';
      expect(actual).to.eql(expected);
    });

    it('Should map the element modifier correctly', () => {
      const actual = runnyComposer();
      const expected = 'FooBar_abc FooBarBaz_abc';
      expect(actual).to.eql(expected);
    });
  });
});

describe('composer.toString', function () {
  const eggComposer = createComposer('Egg');
  const yolkComposer = eggComposer.element('yolk');
  const runnyComposer = yolkComposer.modifier('runny');
  const greenComposer = yolkComposer.modifier({ green: props => props.color });
  const runnyGreenComposer = yolkComposer.modifier({
    green: true,
    runny: true
  });
  const runnyGreenEggyComposer = yolkComposer.modifier({
    color: props => props.color,
    runny: true,
    eggy: false
  });


  it('Should return correct className on block composer', function () {
    const actual = eggComposer.toString();
    const expected = 'Egg';
    expect(actual).to.eql(expected);
  });

  it('Should return correct className on element composer', function () {
    const actual = yolkComposer.toString();
    const expected = 'Egg__yolk';
    expect(actual).to.eql(expected);
  });

  it('Should return correct className on element composer with 1 modifier', function () {
    const actual = runnyComposer.toString();
    const expected = 'Egg__yolk Egg__yolk--runny';
    expect(actual).to.eql(expected);
  });

  it('Should return correct className on element composer with a function modifier', function () {
    const actual = greenComposer.toString();
    const expected = 'Egg__yolk';
    expect(actual).to.eql(expected);
  });

  it('Should return correct className on element composer with a muliple modifiers', function () {
    const actual = runnyGreenComposer.toString();
    const expected = 'Egg__yolk Egg__yolk--green Egg__yolk--runny';
    expect(actual).to.eql(expected);
  });

  it('Should return correct classNames on element with functional mofifiers', function () {
    const actual = runnyGreenEggyComposer.toString({ color: 'green' });
    const expected = 'Egg__yolk Egg__yolk--color-green Egg__yolk--runny';
    expect(actual).to.eql(expected);
  });
});
