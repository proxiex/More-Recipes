import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import App  from '../../components/app';

jest.mock('react-router-dom');

const setup = () => {
  let props
  const wrapper = mount(<App {...props} />);
  return {
    wrapper,
    props
  }
}

describe('Given App is mounted', () => {
  const { wrapper } = setup()
  it('allways renders succesfully', () => {
    expect(wrapper).toMatchSnapshot();
  })
})