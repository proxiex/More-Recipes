import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'
import { NavigationBar }  from '../../components/navigationBar';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    logout: jest.fn(() => Promise.resolve()),
    auth: {
      isAuthenticated: false
    }
  }
  const wrapper = mount(<NavigationBar {...props} />);
  return {
    wrapper,
    props
  }
}

describe('Given NavigationBar is mounted', () => {
  const { wrapper, props } = setup();
  it('should always have more than on div', () => {
    expect(wrapper.find('div').length).toBeGreaterThan(1);
  });

  it ('should dispatch logout when user logs out ', () => {
    const event = {
      preventDefault: jest.fn(),
    }
    wrapper.instance().logout(event);
    expect(props.logout).toBeCalled();
  });

  it('should call map state to props function', () => {
    
  });

  it('should switch nav\'s for userLinks and viewrLinks when user is authenticated', () => {
    const props = {
      auth: {
        isAuthenticated: true
      }
    }
    const wrapper = mount(<NavigationBar {...props} /> )
    expect(wrapper.find('#users-links').length).toEqual(1);
    expect(wrapper.find('#viewer-links').length).toEqual(0);
  })


});
