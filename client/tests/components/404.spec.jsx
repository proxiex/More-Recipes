import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import NotFound404  from '../../components/404';

jest.mock('react-router-dom');

const setup = () => {
  const wrapper = mount(<NotFound404 />);
  return {
    wrapper
  }
}

describe('Given NotFound compoent is mounted', () => {
  const { wrapper } = setup();
  it('always renders succesfully', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  });
});
