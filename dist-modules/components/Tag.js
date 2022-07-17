'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RemoveComponent = require('./RemoveComponent');

var _RemoveComponent2 = _interopRequireDefault(_RemoveComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function Tag(props) {
  var tagRef = (0, _react.useRef)(null);
  var readOnly = props.readOnly,
      tag = props.tag,
      classNames = props.classNames,
      index = props.index;


  var label = props.tag[props.labelField];
  var _tag$className = tag.className,
      className = _tag$className === undefined ? '' : _tag$className;
  /* istanbul ignore next */

  var opacity = 1;
  var tagComponent = _react2.default.createElement(
    'span',
    {
      ref: tagRef,
      className: (0, _classnames2.default)('tag-wrapper', classNames.tag, className),
      style: {
        opacity: opacity,
        cursor: 'auto'
      },
      onClick: props.onTagClicked,
      onTouchStart: props.onTagClicked },
    label,
    _react2.default.createElement(_RemoveComponent2.default, {
      tag: props.tag,
      className: classNames.remove,
      removeComponent: props.removeComponent,
      onRemove: props.onDelete,
      readOnly: readOnly,
      index: index
    })
  );
  return tagComponent;
};

Tag.propTypes = {
  labelField: _propTypes2.default.string,
  onDelete: _propTypes2.default.func.isRequired,
  tag: _propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    key: _propTypes2.default.string
  }),
  removeComponent: _propTypes2.default.func,
  onTagClicked: _propTypes2.default.func,
  classNames: _propTypes2.default.object,
  readOnly: _propTypes2.default.bool,
  index: _propTypes2.default.number.isRequired
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false
};

exports.default = Tag;