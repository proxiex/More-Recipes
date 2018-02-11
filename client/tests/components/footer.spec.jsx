import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import Footer  from '../../components/footer';

jest.mock('react-router-dom');

const setup = () => {
  const wrapper = mount(<Footer />);
  return {
    wrapper
  }
}

describe('Given Footer compoent is mounted', () => {
  const { wrapper } = setup();
  it('always renders a footer tag', () => {
    expect(wrapper.find('footer').length).toEqual(1);
  });
});
