import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import 'materialize-css/dist/js/materialize'

import 'react-froala-wysiwyg';

import { Profile }   from '../../../components/profile/index';

jest.mock('react-router-dom');

const setup = () => {
  const props = {
    getUserProfileAction: jest.fn(() => Promise.resolve()),
  }

  const wrapper = mount(<Profile {...props} />);
  return {
    wrapper,
    props
  }
}

describe('AddReicpePage component', () => {
  const { wrapper } = setup();
  it('always renders succesfully', () => {
    wrapper.setProps({
      profile: {
        UserDetails: {
        },
        recipeDetails: {
        }
      }
    });

    expect(wrapper.find('div').length).toBeGreaterThanOrEqual(1)
  });
})
