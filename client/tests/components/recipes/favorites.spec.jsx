import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import { Favorites }   from '../../../components/recipes/favorites';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    match: {
      params: {
        userId: 3
      }
    },
    getFavoriteRecipeAction: jest.fn(() => Promise.resolve()),
    auth: {
      isAuthenticated: true,
      user: {
        id: 3, 
        username: '',

      }
    }
  }

  const wrapper = mount(<Favorites {...props} />);
  return {
    wrapper,
    props
  }
}

describe('Given UserRecipe component', () => {
  const { wrapper, props } = setup();
  it('should mount successfully', () => {
    expect(wrapper.find('div').length ).toBeGreaterThan(1);
    // expect(props.getFavoriteRecipeAction.mock.calls.length).toBeCalled(1);
  });

  // it('componentWillRecipeProps will be called', () => {
  //   wrapper.setProps({
  //     favorites: {
  //       pageCount: 3,
  //         recipes: [{
  //           userId: 1,
  //           recipe: [
  //             {
  //               id: 1,
  //               userId: 3,
  //               recipeName: '',
  //               recipeImage: '',
  //               description: '',
  //               ingredients: '',
  //               instructions: '',
  //               views: 3,
  //               upVotes: 2,
  //               downVotes: 4,
  //               user: {
  //                 id: 3, 
  //                 username: ''
  //               }
  //             }
  //           ]
  //         }]
  //     }
  //   });

  //   expect(wrapper.state().pageCount).toEqual(3);
  //   expect(wrapper.state().favorites.length).toBeDefined();
  // })

  it('should call onPageChange when page is changed', () => {
    const page = {
      selected: 1
    }
    wrapper.instance().onPageChange(page);
    expect(props.getFavoriteRecipeAction.mock.calls.length).toEqual(2);
  });
});


