# properclass

Designed for use in your React components, properclass is a utility for composing class names using the [bem](https://en.bem.info/methodology/key-concepts/) methodology.

```
npm install properclass --save
```

Create a couple of components...
```javascript
import { createComposer } from 'properclass';

const eggComposer = createComposer('Egg').modifier({ size: props => props.size });
const yolkComposer = eggComposer.element('yolk').modifier({ runny: props => props.isRunny })

const Egg = ({ children }) => (
  <div className={ eggComposer() } >
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
import { createComposer, decorator } from 'properclass';
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

const composer = createComposer('Egg', {
  elementSeparator: '__',
  modifierSeparator: '_',
  modifierValueSeparator: '-'
});
```

## API

##### `properclass.decorator(decoratorOptions : object)`
- param `decoratorOptions` options to the decorator, see [decoratorOptions]().


##### `properclass.createComposer(blockName : string, options : ?composerOptions) : composer`
- param `blockName` The className of this block.
- param `options` options to the className composer, see [composerOptions]().
- returns `composer` a composer function, see [composer]().

##### `composer(props : ?object<string,any>) : string`
- param `props` An object to be used by any functions declared in the map passed to `composer.modifier`, see [modifierOptions]().
- returns `className` the resolved className including the element and modifier clases if specified.

##### `composer.element(elementName : string) : composer`
- param `elementName` the name of this element.
- returns `composer` a new composer function representing this element within the original block.

##### `composer.modifier(modifiers : modifierOptions) : composer`
- param `modifiers` a string, array of strings or object of modifier classNames to add to this block/element. See [modifierOptions]().
- returns `composer` a new composer function with the applied modifiers.

##### `decoratorOptions : object`
- prop `block : string` The name of the block. Required.
- prop `element : ?string` The name of the element
- prop `modifier : ?modifierOptions` Options to composer.modifier, see [modifierOptions]().
- prop `options : ?composerOptions` Additional options to the composer, see [composerOptions]().

##### `modifierOptions : string | string[] | object<string,any>`
- `string` When modifierOptions is a string, `compser()` will always yield a className with the given modifier name.

```javascript
createComposer('Spider').modifier('man')() === 'Spider Spider--man';
```

- `string[]` When modifierOptions is an array of strings, `composer()` will always yield modifiers for each given modifier name.

```javascript
createComposer('Lucky').modifier(['sexy', 'winners'])() === 'Lucky Lucky--sexy Lucky--winners';
```

- `object<string,any>` When modifierOptions is a map, `composer()` will add modifier classNames for each key in the map.
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

const props = { bringsAllTheBoysToTheYard: true };

createComposer('Milkshake').modifier(options)(props) === 'Milkshake Milkshake--flavour-banana Milkshake--better-than-yours';
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
