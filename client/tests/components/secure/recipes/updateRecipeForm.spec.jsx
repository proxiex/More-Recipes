import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'

import 'react-froala-wysiwyg';

import { UpdateRecipeForm }   from '../../../../components/secure/recipes/updateRecipeForm';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    editRecipeAction: jest.fn(),
    recipe: {
      recipeDetails: {

      }
    }
  }

  const wrapper = shallow(<UpdateRecipeForm {...props} />);
  return {
    wrapper,
    props
  }
}

describe('UpdateRecipeForm component', () => {
  const { wrapper, props } = setup();

  it('always renders succesfully', () => {
    wrapper.setProps({});
    
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  });

  it('should setState when data is entered in the form fields', () => {
    const file = new Blob([{
      name: "aQ3x9yd_460s.jpg",
      size: 52169
    }], {type :"image/jpeg"});

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'recipeName',
        value: 'Rice',
        files: [file]
      }
    }
    wrapper.instance().onChange(event)
    wrapper.instance().getPhoto(event)
    wrapper.instance().method('rice is good and stuff')
    wrapper.instance().ingredients('rice, oil, salt')
    expect(wrapper.state().recipeName).toEqual('Rice')
    expect(wrapper.state().method).toEqual('rice is good and stuff')
    expect(wrapper.state().ingredients).toEqual('rice, oil, salt')
  });

  it('should call userSignUpRequest action when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    }
    wrapper.setState(
      {
        description: "This field is description",
        ingredients: "This field is ingredients", 
        method: "This field is method",
        recipeName: "This field is recipeImage",
        imageUrl: 'this field is imageUrl',          
        recipeImage: "This field is recipeImage"
      }
    )
    wrapper.instance().onSubmit(event)
    // expect(wrapper.state().imageUrl).toEqual('Rice')      
    expect(props.editRecipeAction.mock.calls.length).toEqual(0)
  });
})
