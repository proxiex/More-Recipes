import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import SignupForm  from '../../../components/signup/signupForm';

jest.mock('react-router-dom')

const setup = () => {
  const props = {
    userSignupRequest: jest.fn(() => Promise.resolve())
  }

  const wrapper = mount(<SignupForm {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Given SignUpForm component is mounted', () => {
  const { props, wrapper } = setup()

  describe('Validate user input when form is submited', () => {
    it('should throw error when no data is provided', () => {
      const event = {
        preventDefault: jest.fn(),
      }
      wrapper.instance().onSubmit(event);
      expect(wrapper.state().errors).toEqual(
        { 
          email: "This field is required", 
          password: "This field is required", 
          username: "This field is required"
        }
      )
    });

    it('should throw an error if email is not valid', () => {
      const event = {
        preventDefault: jest.fn(),
      }
      wrapper.setState({username:'ayo', email:'wrong@email.com', password:'ayo'})
      wrapper.instance().onSubmit(event)
      expect(wrapper.state().errors).toEqual({ password: 'Your password needs to be longer than 6 characters'})
    });

    it('should throw an error if email is not valid', () => {
      const event = {
        preventDefault: jest.fn(),
      }
      wrapper.setState({username:'ayo', email:'wrong-email', password:'ayo09090900'})
      wrapper.instance().onSubmit(event)
      expect(wrapper.state().errors).toEqual({ email: 'Email is invalid'})
    });
  });

  it('should setState when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'username',
        value: 'ayo'
      }
    }
    wrapper.instance().onChange(event)
    expect(wrapper.state().username).toEqual('ayo')
  });


  it('should call userSignUpRequest action when form is submitted', () => {
    const event = {
      preventDefault: jest.fn(),
    }
    wrapper.setState({username:'ayo', email:'ayo@name.com', password:'ayo09090900'})
    wrapper.instance().onSubmit(event)
    expect(props.userSignupRequest.mock.calls.length).toEqual(1)
  });

});
