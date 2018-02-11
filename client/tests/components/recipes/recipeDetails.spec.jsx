import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import { RecipeDetails }   from '../../../components/recipes/recipeDetails';
import { wrap } from 'module';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    match: {
      params: {
        recipeId: 3
      }
    },
    voteAction: jest.fn(() => Promise.resolve()),
    addReviewAction: jest.fn(() => Promise.resolve()),
    getRecipeDetails: jest.fn(() => Promise.resolve()),
    favoriteRecipeAction: jest.fn(() => Promise.resolve()),
    deleteRecipeAction: jest.fn(() => Promise.resolve()),
    recipe: {
      recipeDetails: {
        id: 1,
        userId: 1,
        recipeName: '',
        recipeImage: '',
        description: '',
        ingredients: '',
        instructions: '',
        views: 3,
        userVotes: {
          upVotes: 1,
          downVotes: 0,
        }
      }
    },
    review: [
      {
        id: 1,
        review: '',
        user: {
          id: 2,
          username: '',
          avatar: ''
        }
      }
    ],
    auth: {
      isAuthenticated: true,
      user: {
        id: 1, 
        username: '',

      }
    }
  }

  const wrapper = mount(<RecipeDetails {...props} />);
  return {
    wrapper,
    props
  }
}

describe('RecipeDetails component', () => {
  const { wrapper, props } = setup();
  it('should mount succesfully', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(10);
  });

  it('should call addReviewAction action when review form is submited', () => {
    const event = {
      preventDefault: jest.fn()
    }
    wrapper.instance().onSubmit(event);
    expect(props.addReviewAction.mock.calls.length).toEqual(1)
  });

  it('should setState when review form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'review',
        value: 'review here'
      }
    };
    wrapper.instance().onChange(event);
    expect(wrapper.state().review).toEqual('review here');
  });
  
  it('should call deleteRecipeAction when a recipe is deleted', () => {
    wrapper.instance().delete();
    expect(props.deleteRecipeAction.mock.calls.length).toEqual(1)
  });

  it('should call voteAction when a recipe is up voted for', () => {
    wrapper.instance().upVote();
    expect(props.voteAction.mock.calls.length).toEqual(1)
  });

  it('should call voteAction when a recipe is down voted for', () => {
    wrapper.instance().downVote();
    expect(props.voteAction.mock.calls.length).toEqual(2)
  });

  it('should call favoriteRecipeAction when a recipe is added to favorite list', () => {
    wrapper.instance().favoriteRecipe();
    expect(props.favoriteRecipeAction.mock.calls.length).toEqual(1)
  });
  
});
