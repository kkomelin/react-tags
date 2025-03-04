import { expect } from 'chai';
import PropTypes from 'prop-types';
import React from 'react';

import { mount } from 'enzyme';
import noop from 'lodash/noop';
import sinon from 'sinon';
import RemoveComponent from '../src/components/RemoveComponent';
import Tag from '../src/components/Tag';

function mockItem(overrides) {
  const props = Object.assign(
    {},
    {
      tag: { id: '1', text: 'FooBar', className: 'action' },
      onDelete: noop,
      readOnly: false,
      classNames: {
        tag: 'tag',
        remove: 'remove',
      },
      index: 0,
    },
    overrides
  );
  return (
    <Tag {...props} />
  );
}

describe('Tag', () => {
  test('shows the classnames of children properly', () => {
    const $el = mount(mockItem());
    expect($el.find('.tag').length).to.equal(1);
    expect($el.text()).to.have.string('FooBar');
  });

  test('should show cross for removing tag when read-only is false', () => {
    const $el = mount(mockItem());
    expect($el.find(RemoveComponent).length).to.equal(1);
  });

  test('should not show cross for removing tag when read-only is true', () => {
    const $el = mount(mockItem({ readOnly: true }));
    expect($el.find('a.remove').length).to.equal(0);
  });

  test('renders passed in removed component correctly', () => {
    const CustomRemoveComponent = function () {
      return <a className="remove">delete me</a>;
    };
    const $el = mount(mockItem({ removeComponent: CustomRemoveComponent }));
    expect($el.find('a.remove').length).to.equal(1);
    expect($el.text()).to.have.string('delete me');
  });

  test('renders conditional passed in removed component correctly', () => {
    const CustomConditionRemoveComponent = function (props) {
      return props.tag.id === '1' ? null : <a className="removeTag">x</a>;
    };
    CustomConditionRemoveComponent.propTypes = {
      tag: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    };
    const $el = mount(
      mockItem({ removeComponent: CustomConditionRemoveComponent })
    );
    expect($el.find('.removeTag').length).to.equal(0);
  });

  test('calls the delete handler correctly', () => {
    const spy = sinon.spy();
    const $el = mount(mockItem({ onDelete: spy }));
    $el.find(RemoveComponent).simulate('click');
    expect(spy.calledOnce).to.be.true;
    spy.resetHistory();
  });

  test('should add className passed in tags to the tag', () => {
    const $el = mount(mockItem());
    expect($el.find('.action').length).to.equal(1);
  });

  test('calls the tag click handler correctly', () => {
    const spy = sinon.spy();
    const $el = mount(mockItem({ onTagClicked: spy }));
    $el.find('span').simulate('click');
    expect(spy.calledOnce).to.be.true;
    spy.resetHistory();
  });

  test('should trigger the tag click handler on touchStart', () => {
    const onTagClickedStub = sinon.stub();
    const $el = mount(mockItem({ onTagClicked: onTagClickedStub }));
    $el.find('span').simulate('touchStart');
    expect(onTagClickedStub.calledOnce).to.be.true;
  });
});
