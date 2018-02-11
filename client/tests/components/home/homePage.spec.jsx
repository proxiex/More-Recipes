import React from 'react';
import { mount } from 'enzyme';
import 'materialize-css/dist/js/materialize'
import HomePage  from '../../../components/home/homePage';

jest.mock('react-router-dom');


describe('Home Page component', () => {
  const wrapper = mount(<HomePage />);

  it('always render sucessfully', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  });
})
