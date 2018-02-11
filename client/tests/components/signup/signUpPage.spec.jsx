import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import { SignupPage }  from '../../../components/signup/signupPage';

jest.mock('react-router-dom')

const setup = () => {
  const props = {
    userSignupRequest: jest.fn(() => Promise.resolve())
  }

  const wrapper = shallow(<SignupPage {...props} />)

  return {
    props,
    wrapper
  }
}
describe('SignupPage component', () => {
  const { wrapper } = setup()
  it('should always mount successfully', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  })
})
