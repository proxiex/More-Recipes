import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'

import 'react-froala-wysiwyg';

import { UpdateRecipePage } from '../../../../components/secure/recipes/updateRecipePage';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    match: {
      params: {
        recipeId: 2
      }
    },
    recipe: {},
    getRecipeDetails: jest.fn(() => Promise.resolve()),
    addRecipeAction: jest.fn(() => Promise.resolve())
  }

  const wrapper = shallow(<UpdateRecipePage {...props} />);
  return {
    wrapper,
    props
  }
}

describe('UpdateRecipePage component', () => {
  const { wrapper, props } = setup();

  it('always renders succesfully', () => {
    expect(props.getRecipeDetails.mock.calls.length).toEqual(1);
    expect(wrapper.find('div').length).toEqual(1);
  });

})
