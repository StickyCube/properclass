(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Properclass"] = factory(require("react"));
	else
		root["Properclass"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.decorator = exports.createBlockDecorator = exports.createComposer = undefined;

	var _createComposer = __webpack_require__(1);

	var _createComposer2 = _interopRequireDefault(_createComposer);

	var _decorator = __webpack_require__(2);

	var _decorator2 = _interopRequireDefault(_decorator);

	var _createBlockDecorator = __webpack_require__(3);

	var _createBlockDecorator2 = _interopRequireDefault(_createBlockDecorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createComposer = _createComposer2.default;
	exports.createBlockDecorator = _createBlockDecorator2.default;
	exports.decorator = _decorator2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	  var _options$elementSepar = options.elementSeparator,
	      elementSeparator = _options$elementSepar === undefined ? '__' : _options$elementSepar,
	      _options$modifierSepa = options.modifierSeparator,
	      modifierSeparator = _options$modifierSepa === undefined ? '--' : _options$modifierSepa,
	      _options$modifierValu = options.modifierValueSeparator,
	      modifierValueSeparator = _options$modifierValu === undefined ? '-' : _options$modifierValu;


	  options.elementSeparator = elementSeparator;
	  options.modifierSeparator = modifierSeparator;
	  options.modifierValueSeparator = modifierValueSeparator;

	  return options;
	};

	var formatClassName = function formatClassName(parts, options) {
	  var className = parts.blockName;
	  var elementSeparator = options.elementSeparator,
	      modifierSeparator = options.modifierSeparator,
	      modifierValueSeparator = options.modifierValueSeparator;


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

	    if (isArray(modifierValue)) {
	      return [].concat(names, modifierValue.filter(function (val) {
	        return !isFalsy(val);
	      }).map(function (value) {
	        return {
	          modifierKey: modifierKey,
	          modifierValue: value
	        };
	      }));
	    }

	    return [].concat(names, [{ modifierKey: modifierKey, modifierValue: modifierValue }]);
	  }, []);
	};

	function createComposer(blockName) {
	  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var options = validateOptions(opt);
	  var styleMap = options.styleMap,
	      elementName = options.elementName,
	      modifiers = options.modifiers;


	  var composer = function composer() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = decorator;

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _createComposer = __webpack_require__(1);

	var _createComposer2 = _interopRequireDefault(_createComposer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var concat = function concat(a, b) {
	  if (!b) return a || '';
	  if (!a) return b || '';
	  return a + ' ' + b;
	};

	function decorator(_ref) {
	  var block = _ref.block,
	      element = _ref.element,
	      modifier = _ref.modifier,
	      options = _ref.options,
	      _ref$withRef = _ref.withRef,
	      withRef = _ref$withRef === undefined ? true : _ref$withRef;

	  var composer = (0, _createComposer2.default)(block, options);

	  if (element) {
	    composer = composer.element(element);
	  }

	  if (modifier) {
	    composer = composer.modifier(modifier);
	  }

	  return function (WrappedComponent) {
	    var WrapperComponent = function (_React$Component) {
	      _inherits(WrapperComponent, _React$Component);

	      function WrapperComponent() {
	        _classCallCheck(this, WrapperComponent);

	        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	      }

	      WrapperComponent.prototype.getWrappedInstance = function getWrappedInstance() {
	        return this.wrappedInstance;
	      };

	      WrapperComponent.prototype.render = function render() {
	        var _this2 = this;

	        var props = void 0;

	        if (withRef) {
	          props = _extends({}, this.props, { withRef: function withRef(ref) {
	              _this2.wrappedInstance = ref;
	            } });
	        } else {
	          props = this.props;
	        }

	        return _react2.default.createElement(WrappedComponent, _extends({}, props, {
	          className: concat(this.props.className, composer(this.props))
	        }));
	      };

	      return WrapperComponent;
	    }(_react2.default.Component);

	    if (WrappedComponent.propTypes) {
	      WrapperComponent.propTypes = WrappedComponent.propTypes;
	    }

	    if (WrappedComponent.defaultProps) {
	      WrapperComponent.defaultProps = WrappedComponent.defaultProps;
	    }

	    return WrapperComponent;
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = createBlockDecorator;

	var _decorator = __webpack_require__(2);

	var _decorator2 = _interopRequireDefault(_decorator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var createDecorator = function createDecorator(_ref) {
	  var blockName = _ref.blockName,
	      elementName = _ref.elementName,
	      _ref$opts = _ref.opts,
	      opts = _ref$opts === undefined ? {} : _ref$opts;

	  return function () {
	    var decoratorOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    return function (WrappedComponent) {
	      var element = decoratorOptions.element,
	          modifier = decoratorOptions.modifier,
	          _decoratorOptions$opt = decoratorOptions.options,
	          options = _decoratorOptions$opt === undefined ? {} : _decoratorOptions$opt;

	      return (0, _decorator2.default)({
	        block: blockName,
	        element: element || elementName,
	        modifier: modifier,
	        options: _extends({}, options, opts)
	      })(WrappedComponent);
	    };
	  };
	};

	function createBlockDecorator(blockName) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var blockDecorator = createDecorator({ blockName: blockName, opts: opts });

	  blockDecorator.element = function (elementName) {
	    return createDecorator({ blockName: blockName, elementName: elementName, opts: opts });
	  };

	  return blockDecorator;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;