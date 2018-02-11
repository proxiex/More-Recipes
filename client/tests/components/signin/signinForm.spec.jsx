import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import { SigninForm }  from '../../../components/signin/signinForm';

jest.mock('react-router-dom')

const setup = () => {
  const props = {
    userSigninRequest: jest.fn(() => Promise.resolve())
  }

  const wrapper = mount(<SigninForm {...props} />)

  return {
    props,
    wrapper
  }
}

describe('Given signinForm component is mounted', () => {
  const { props, wrapper } = setup();
  describe('Validate your input when form is submited', () => {
    it('should throw an error when no data is provided', () => {
      const event = {
        preventDefault: jest.fn(),
      }
      wrapper.instance().onSubmit(event);
      expect(wrapper.state().errors).toEqual(
        {
          password: "This field is required", 
          username: "This field is required"
        }
      )
    })
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
    expect(props.userSigninRequest.mock.calls.length).toEqual(1)
  });

});
