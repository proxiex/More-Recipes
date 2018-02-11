import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import { RecipePage }   from '../../../components/recipes/recipePage';
import { wrap } from 'module';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    getAllRecipeAction: jest.fn(() => Promise.resolve()),
    getPopularRecipeAction: jest.fn(() => Promise.resolve()),
    searchSucessAction: jest.fn(() => Promise.resolve()),
    auth: {
      isAuthenticated: true
    }
  }

  const wrapper = mount(<RecipePage {...props} />);
  return {
    wrapper,
    props
  }
}

describe('Given RecipePage component is mounted', () => {
  const { wrapper, props } = setup();
  
  it('should always mount succesfylly', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  });

  it('should call onPageChange when page is changed', () => {
    const page = {
      selected: 1
    }
    wrapper.instance().onPageChange(page);
    expect(props.getAllRecipeAction.mock.calls.length).toEqual(2);
  });

  it('componentWillRecipeProps will be called', () => {
    wrapper.setProps({
      popularRecipe: [
        {
          id: 4, 
          recipeName: 'cool'
        }
      ],
      recipe: {
        recipes: [
          {
            id: 1,
            recipeName: 'Rice and Potatoes',
            recipeImage: 'url',
            views: 4,
            downVotes: 4,
            upVotes: 34,
            user: {
              id: 1,
              username: 'Proxie'
            }
          }
        ],
        pageCount: 2
      },
      message: ''
    });
    expect(wrapper.state().recipes.length).toBeGreaterThan(0);
  });
});
