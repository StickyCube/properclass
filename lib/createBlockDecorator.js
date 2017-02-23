'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createBlockDecorator;

var _decorator = require('./decorator.js');

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