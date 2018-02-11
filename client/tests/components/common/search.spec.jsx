import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import { Search }  from '../../../components/common/search';

jest.mock('react-router-dom')

const setup = () => {
  const props = {
    searchSucessAction: jest.fn(() => Promise.resolve())
  }

  const wrapper = shallow(<Search {...props} />)

  return {
    props,
    wrapper
  }
}
describe('Search component', () => {
  const { wrapper, props } = setup()

  it('should always mount successfully', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('it should call on change function when form data is changed', () => {
    const event = {
      target: {
        name: 'search',
        value: 'Seomthg is search'
      }
    }
    wrapper.instance().onChange(event);
    expect(wrapper.state().search).toEqual('Seomthg is search');
    expect(props.searchSucessAction.mock.calls.length).toEqual(1);
  })
})
