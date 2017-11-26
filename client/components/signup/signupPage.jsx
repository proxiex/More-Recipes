import React from 'react';
import SignupForm from './signupForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSignupRequest } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
  render () {
    const { userSignupRequest } = this.props;
    return (
      <div id="wrapper" className="contiainer center">
        <div className="row">
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
}

export default connect(null, { userSignupRequest })(SignupPage);