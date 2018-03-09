'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = decorator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createComposer = require('./createComposer.js');

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