import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'

import 'react-froala-wysiwyg';

import { AddRecipePage }   from '../../../../components/secure/recipes/addRecipePage';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    addRecipeAction: jest.fn(() => Promise.resolve()),
  }

  const wrapper = shallow(<AddRecipePage {...props} />);
  return {
    wrapper,
    props
  }
}

describe('AddReicpePage component', () => {
  const { wrapper } = setup();
  it('always renders succesfully', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
})
