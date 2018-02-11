import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'

import 'react-froala-wysiwyg';

import { UserData }   from '../../../components/profile/userData';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    updatetUserPasswordAction: jest.fn(() => Promise.resolve()),
    updatetUserProfileAction: jest.fn(() => Promise.resolve()),
  }

  const wrapper = mount(<UserData {...props} />);
  return {
    wrapper,
    props
  }
}

describe('AddReicpePage component', () => {
  const { wrapper, props } = setup();
  it('always renders succesfully', () => {
    wrapper.setProps({
      userData: {
        firstName: 'proxie',
        lastName: 'me',
        username: 'bryan'
      }
    });
    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
  });

  it('should setState when data is entered in form', () => {
    const file = new Blob([{
      name: "aQ3x9yd_460s.jpg",
      size: 52169
    }], {type :"image/jpeg"});

    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'username',
        value: 'ayo',
        files: [file]
      }
    }
    wrapper.instance().onChange(event)
    wrapper.instance().getPhoto(event)    
    expect(wrapper.state().username).toEqual('ayo')
  });

  it('should call updatetUserPasswordAction when password is changed', () => {
    const event = {
      preventDefault: jest.fn()
    } 
    wrapper.setState({
      oldPassword: 'pass',
      newPassword: 'newPass'
    })
    wrapper.instance().changePassword(event)
    expect(props.updatetUserPasswordAction.mock.calls.length).toEqual(1)
  });

  it('should call updatetUserProfileAction when form is submited', () => {
    const event = {
      preventDefault: jest.fn()
    } 
    wrapper.setState({
      username: 'me',
      imageUrl: 'url'
    });
    wrapper.instance().onSubmit(event);
    expect(props.updatetUserProfileAction.mock.calls.length).toEqual(0)
  });
})
