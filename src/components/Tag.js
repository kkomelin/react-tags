import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import RemoveComponent from './RemoveComponent';

const Tag = (props) => {
  const tagRef = useRef(null);
  const { readOnly, tag, classNames, index } = props;

  const label = props.tag[props.labelField];
  const { className = '' } = tag;
  /* istanbul ignore next */
  const opacity = 1;
  const tagComponent = (
    <span
      ref={tagRef}
      className={ClassNames('tag-wrapper', classNames.tag, className)}
      style={{
        opacity,
        cursor: 'auto',
      }}
      onClick={props.onTagClicked}
      onTouchStart={props.onTagClicked}>
      {label}
      <RemoveComponent
        tag={props.tag}
        className={classNames.remove}
        removeComponent={props.removeComponent}
        onRemove={props.onDelete}
        readOnly={readOnly}
        index={index}
      />
    </span>
  );
  return tagComponent;
};

Tag.propTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  removeComponent: PropTypes.func,
  onTagClicked: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

Tag.defaultProps = {
  labelField: 'text',
  readOnly: false,
};

export default Tag;
