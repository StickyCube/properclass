const VALID_CLASSNAME_PATTERN = /[_a-zA-Z]+[_a-zA-Z0-9-]*/;

const isArray = val => Array.isArray(val);

const isString = val => typeof val === 'string';

const isFunction = val => typeof val === 'function';

const isPlainObject = val => (
  val &&
  val.constructor === Object
);

const isClassName = className => VALID_CLASSNAME_PATTERN.test(className);

const isFalsy = val => (
  val == null ||
  val === false ||
  val === ''
);

const warning = function (message) {
  console.error(message);

  try {
    throw new Error(message);
  } catch (e) {}
};

const validateClassNames = function (classNames) {
  return classNames.forEach(name => {
    if (!isClassName(name)) {
      warning(`className ${name} contains invalid characters`);
    }
  });
};

const validateOptions = function (opt) {
  const options = { ...opt };
  const {
    elementSeparator = '__',
    modifierSeparator = '--',
    modifierValueSeparator = '-'
  } = options;

  options.elementSeparator = elementSeparator;
  options.modifierSeparator = modifierSeparator;
  options.modifierValueSeparator = modifierValueSeparator;

  return options;
};

const formatClassName = function (parts, options) {
  let className = parts.blockName;
  const {
    elementSeparator,
    modifierSeparator,
    modifierValueSeparator
  } = options;

  if (parts.elementName) {
    className += `${elementSeparator}${parts.elementName}`;
  }

  if (parts.modifierKey) {
    className += `${modifierSeparator}${parts.modifierKey}`;
  }

  if (!isFalsy(parts.modifierValue)) {
    className += `${modifierValueSeparator}${parts.modifierValue}`;
  }

  return className;
};

const getModifierNames = function (props, modifiers) {
  if (!isPlainObject(modifiers)) {
    return [];
  }

  return Object.keys(modifiers).reduce(
    (names, modifierKey) => {
      let modifierValue = modifiers[modifierKey];

      if (isFunction(modifierValue)) {
        modifierValue = modifierValue(props);
      }

      if (isFalsy(modifierValue)) {
        return names;
      }

      if (modifierValue === true) {
        return [...names, { modifierKey }];
      }


      if (isArray(modifierValue)) {
        return [
          ...names,
          ...modifierValue.filter(val => !isFalsy(val)).map(value => ({
            modifierKey,
            modifierValue: value
          }))
        ];
      }

      return [...names, { modifierKey, modifierValue }];
    },
    []
  );
};

export default function createComposer (blockName, opt = {}) {
  const options = validateOptions(opt);
  const { styleMap, elementName, modifiers } = options;

  const composer = function (props = {} ) {
    const modifierNames = getModifierNames(props, modifiers);
    const hasModifiers = modifierNames.length > 0;
    const baseClass = { blockName };

    let classNames;

    if (elementName) {
      baseClass.elementName = elementName;
    }

    if (hasModifiers) {
      classNames = [baseClass].concat(
        modifierNames.map(modifier => ({ ...baseClass, ...modifier }))
      );
    } else {
      classNames = [baseClass];
    }

    classNames = classNames.map(elm => formatClassName(elm, options));

    if (isFunction(styleMap)) {
      classNames = classNames.map(styleMap);
    }

    if (isPlainObject(styleMap)) {
      classNames = classNames.map(
        name => styleMap[name]
          ? styleMap[name]
          : name
      );
    }

    if (!options.suppressWarnings) {
      validateClassNames(classNames);
    }

    return classNames.join(' ');
  };

  composer.element = elementName => {
    return createComposer(
      blockName,
      {
        ...options,
        elementName,
        modifiers: {}
      }
    );
  };

  composer.modifier = arg => {
    let additionaModifiers = {};

    if (isString(arg)) {
      additionaModifiers = { [arg]: true };
    }

    if (isArray(arg)) {
      additionaModifiers = arg.reduce(
        (modifiers, name) => ({ ...modifiers, [name]: true }),
        {}
      );
    }

    if (isPlainObject(arg)) {
      additionaModifiers = arg;
    }

    return createComposer(
      blockName,
      {
        ...options,
        modifiers: {
          ...modifiers,
          ...additionaModifiers
        }
      }
    );
  };

  composer.toString = function (props) {
    return composer(props);
  };

  return composer;
}
