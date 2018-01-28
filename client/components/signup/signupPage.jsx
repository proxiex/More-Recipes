import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignupForm from './signupForm';
import { userSignupRequest } from '../../actions/signupActions';
/**
 *
 *
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {
  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div id="wrapper" className="contiainer center">
        <div className="row no-margin-bottom">
          <div className="col s12 m4 offset-m4">
            <h4 className="white-text">Signup</h4>
            <SignupForm userSignupRequest={userSignupRequest} />
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignupPage);
