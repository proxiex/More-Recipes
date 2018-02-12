import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignupForm from './signupForm';
import { userSignupRequest } from '../../actions/users/signup';

/**
 * Signup page
 * @class SignupPage
 * @extends {React.Component}
 */
export class SignupPage extends Component {
  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { userSignupRequest, error } = this.props;
    return (
      <div id="wrapper" className="contiainer center">
        <div className="row no-margin-bottom">
          <div className="col s12 m4 offset-m4">
            <h4 className="white-text">Signup</h4>
            <SignupForm userSignupRequest={userSignupRequest} error={error} />
          </div>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error
});
export default connect(mapStateToProps, { userSignupRequest })(SignupPage);
