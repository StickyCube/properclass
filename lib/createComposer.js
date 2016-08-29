'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createComposer;
var VALID_CLASSNAME_PATTERN = /[_a-zA-Z]+[_a-zA-Z0-9-]*/;

var isArray = function isArray(val) {
  return Array.isArray(val);
};

var isString = function isString(val) {
  return typeof val === 'string';
};

var isFunction = function isFunction(val) {
  return typeof val === 'function';
};

var isPlainObject = function isPlainObject(val) {
  return val && val.constructor === Object;
};

var isClassName = function isClassName(className) {
  return VALID_CLASSNAME_PATTERN.test(className);
};

var isFalsy = function isFalsy(val) {
  return val == null || val === false || val === '';
};

var warning = function warning(message) {
  console.error(message);

  try {
    throw new Error(message);
  } catch (e) {}
};

var validateClassNames = function validateClassNames(classNames) {
  return classNames.forEach(function (name) {
    if (!isClassName(name)) {
      warning('className ' + name + ' contains invalid characters');
    }
  });
};

var validateOptions = function validateOptions(opt) {
  var options = _extends({}, opt);
  var _options$elementSepar = options.elementSeparator;
  var elementSeparator = _options$elementSepar === undefined ? '__' : _options$elementSepar;
  var _options$modifierSepa = options.modifierSeparator;
  var modifierSeparator = _options$modifierSepa === undefined ? '--' : _options$modifierSepa;
  var _options$modifierValu = options.modifierValueSeparator;
  var modifierValueSeparator = _options$modifierValu === undefined ? '-' : _options$modifierValu;


  options.elementSeparator = elementSeparator;
  options.modifierSeparator = modifierSeparator;
  options.modifierValueSeparator = modifierValueSeparator;

  return options;
};

var formatClassName = function formatClassName(parts, options) {
  var className = parts.blockName;
  var elementSeparator = options.elementSeparator;
  var modifierSeparator = options.modifierSeparator;
  var modifierValueSeparator = options.modifierValueSeparator;


  if (parts.elementName) {
    className += '' + elementSeparator + parts.elementName;
  }

  if (parts.modifierKey) {
    className += '' + modifierSeparator + parts.modifierKey;
  }

  if (!isFalsy(parts.modifierValue)) {
    className += '' + modifierValueSeparator + parts.modifierValue;
  }

  return className;
};

var getModifierNames = function getModifierNames(props, modifiers) {
  if (!isPlainObject(modifiers)) {
    return [];
  }

  return Object.keys(modifiers).reduce(function (names, modifierKey) {
    var modifierValue = modifiers[modifierKey];

    if (isFunction(modifierValue)) {
      modifierValue = modifierValue(props);
    }

    if (isFalsy(modifierValue)) {
      return names;
    }

    if (modifierValue === true) {
      return [].concat(names, [{ modifierKey: modifierKey }]);
    }

    return [].concat(names, [{ modifierKey: modifierKey, modifierValue: modifierValue }]);
  }, []);
};

function createComposer(blockName) {
  var opt = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var options = validateOptions(opt);
  var styleMap = options.styleMap;
  var elementName = options.elementName;
  var modifiers = options.modifiers;


  var composer = function composer() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var modifierNames = getModifierNames(props, modifiers);
    var hasModifiers = modifierNames.length > 0;
    var baseClass = { blockName: blockName };

    var classNames = void 0;

    if (elementName) {
      baseClass.elementName = elementName;
    }

    if (hasModifiers) {
      classNames = [baseClass].concat(modifierNames.map(function (modifier) {
        return _extends({}, baseClass, modifier);
      }));
    } else {
      classNames = [baseClass];
    }

    classNames = classNames.map(function (elm) {
      return formatClassName(elm, options);
    });

    if (isFunction(styleMap)) {
      classNames = classNames.map(styleMap);
    }

    if (isPlainObject(styleMap)) {
      classNames = classNames.map(function (name) {
        return styleMap[name] ? styleMap[name] : name;
      });
    }

    if (!options.suppressWarnings) {
      validateClassNames(classNames);
    }

    return classNames.join(' ');
  };

  composer.element = function (elementName) {
    return createComposer(blockName, _extends({}, options, {
      elementName: elementName,
      modifiers: {}
    }));
  };

  composer.modifier = function (arg) {
    var additionaModifiers = {};

    if (isString(arg)) {
      var _additionaModifiers;

      additionaModifiers = (_additionaModifiers = {}, _additionaModifiers[arg] = true, _additionaModifiers);
    }

    if (isArray(arg)) {
      additionaModifiers = arg.reduce(function (modifiers, name) {
        var _extends2;

        return _extends({}, modifiers, (_extends2 = {}, _extends2[name] = true, _extends2));
      }, {});
    }

    if (isPlainObject(arg)) {
      additionaModifiers = arg;
    }

    return createComposer(blockName, _extends({}, options, {
      modifiers: _extends({}, modifiers, additionaModifiers)
    }));
  };

  composer.toString = function (props) {
    return composer(props);
  };

  return composer;
}