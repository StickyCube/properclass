# properclass

[![Coverage Status](https://coveralls.io/repos/github/StickyCube/properclass/badge.svg?branch=master)](https://coveralls.io/github/StickyCube/properclass?branch=master)

Designed for use in your React components, properclass is a utility for composing html class names which follow [BEM](https://en.bem.info/methodology/key-concepts/) conventions.

```
npm install properclass --save
```

Create a couple of components...
```javascript
import { createComposer } from 'properclass';

const eggComposer = createComposer('Egg').modifier({ size: props => props.size });
const yolkComposer = eggComposer.element('yolk').modifier({ runny: props => props.isRunny })

const Egg = ({ children, ...props }) => (
  <div className={ eggComposer(props) } >
    { children }
  </div>
);

const Yolk = props => (
  <div className={ yolkComposer(props) } />
);
```

Now let's render some eggs...
```html
<Egg size='big' >
  <Yolk />
</Egg>

<Egg>
  <Yolk isRunny >
</Egg>

<!-- ** Result ** -->

<div class="Egg Egg--size-big" >
  <div class="Egg__yolk" ></div>
</div>

<div class="Egg" >
  <div class="Egg__yolk Egg__yolk--runny" ></div>
</div>

```

Also available as an es7 decorator...
```javascript
import React from 'react';
import { decorator as properclass } from 'properclass';

@properclass({
  block: 'Egg',
  element: 'yolk',
  modifier: {
    runny: props => props.isRunny
  }
})
class Yolk extends React.Component {
  render () {
    return (
      <div {...this.props} />
    );
  }
}
```

Easy integration with css modules...

```javascript
import React from 'react';
import createComposer from 'properclass/lib/createComposer';
import decorator from 'properclass/lib/decorator';
import eggStyles from 'styles/Egg.css';

const composer = createComposer('Egg', { styleMap: eggStyles }).element('yolk');

@decorator({
  block: 'Egg',
  element: 'yolk',
  options: {
    styleMap: eggStyles
  }
})
class Yolk extends React.Component {
  ...
}
```

Customize separators to suit your style...
```javascript
import { createComposer } from 'properclass';

const classicBemComposer = createComposer('Egg', {
  elementSeparator: '__',
  modifierSeparator: '_',
  modifierValueSeparator: '-'
});
```

## API

##### `properclass.decorator(decoratorOptions : object)`
- param `decoratorOptions` options to the decorator, see [decoratorOptions](#decoratoroptions--object).

##### `properclass.createBlockDecorator(blockName : string, options : ?composerOptions) : blockDecorator`
- param `blockName` The className of this block
- param `options` options to the className composer, see [composerOptions](#composeroptions--object).
- returns `blockDecorator` a properclass.decorator function with `decoratorOptions.block` and `decoratorOptions.options` set with the given arguments.

##### `properclass.createComposer(blockName : string, options : ?composerOptions) : composer`
- param `blockName` The className of this block.
- param `options` options to the className composer, see [composerOptions](#composeroptions--object).
- returns `composer` a composer function, see [composer](#composerprops--objectstringany--string).

##### `composer(props : ?object<string,any>) : string`
- param `props` An object to be used by any functions declared in the map passed to `composer.modifier`, see [modifierOptions](modifieroptions--string--string--objectstringany).
- returns `className` the resolved className including the element and modifier clases if specified.

##### `composer.element(elementName : string) : composer`
- param `elementName` the name of this element.
- returns `composer` a new composer function representing this element within the original block.

##### `composer.modifier(modifiers : modifierOptions) : composer`
- param `modifiers` a string, array of strings or object of modifier classNames to add to this block/element. See [modifierOptions](modifieroptions--string--string--objectstringany).
- returns `composer` a new composer function with the applied modifiers.

##### `decoratorOptions : object`
- prop `block : string` The className of the block. Required.
- prop `element : ?string` The name of the element
- prop `modifier : ?modifierOptions` Options to composer.modifier, see [modifierOptions](modifieroptions--string--string--objectstringany).
- prop `options : ?composerOptions` Additional options to the composer, see [composerOptions](#composeroptions--object).

##### `modifierOptions : string | string[] | object<string,any>`
- `string` When modifierOptions is a string, `compser()` will always yield a className with the given modifier name.

```javascript
assert.equal(
  createComposer('Spider').modifier('man')(),
  'Spider Spider--man';
);
```

- `string[]` When modifierOptions is an array of strings, `composer()` will always yield modifiers for each given modifier name.

```javascript
assert.equal(
  createComposer('Lucky').modifier(['sexy', 'winners'])(),
  'Lucky Lucky--sexy Lucky--winners'
);
```

- `object<string,any>` When modifierOptions is a map, `composer()` will yield modifier classNames for each key in the map.
  - Keys mapping to `true` values yield a className with the format `'BlockName--key'`.
  - Keys mapping to `null|undefined|false` are omitted
  - Keys mapping to `string` values yield a className with the format `'BlockName--key-value'`
  - Keys mapping to `function` values apply these cases to the return value.

```javascript
const options = {
  flavour: 'banana',
  size: null,
  'better-than-yours': props => props.bringsAllTheBoysToTheYard
};

assert.equal(
  createComposer('Milkshake').modifier(options)({ bringsAllTheBoysToTheYard: true }),
  'Milkshake Milkshake--flavour-banana Milkshake--better-than-yours'
);
```

##### `composerOptions : object`
- prop `styleMap : object<string,string> | function(string) : string` An object or function mapping the final classNames for an element.
- prop `elementSeparator : string` The separator pattern for block/element.
  - default `'__'`
- prop `modifierSeparator : string` The separator pattern for block|element/modifier.
  - default `'--'`
- prop `modifierValueSeparator : string` The separator pattern for modifierKey/modifierValue.
 - default `'-'`
- prop `suppressWarnings : boolean` Suppress warning messages when classNames contain invalid characters.
 - default `false`


## Examples

#### `createBlockDecorator`

```javascript
import React, { Component } from 'react';
import { createBlockDecorator } from 'properclass';
import styles from 'styles/Egg.css';

const properclass = createBlockDecorator('Egg', { styleMap: styles });

@properclass()
class Egg extends Component {
  ...
}

@properclass({ element: 'yolk', modifier: { ... } })
class Yolk extends Component {
  ...
}

```
