import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SigninForm from './signinForm';
import { userSigninRequest } from '../../actions/users/signin';

class SigninPage extends React.Component {
  render() {
    const { userSigninRequest } = this.props;
    return (
      <div id="wrapper" className="contiainer center">
        <div className="row no-margin-bottom">
          <div className="col s12 m4 offset-m4">
            <h4 className="white-text">Signin</h4>
            <SigninForm userSigninRequest={userSigninRequest} />
          </div>
        </div>
      </div>
    );
  }
}

SigninPage.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

export default connect(null, { userSigninRequest })(SigninPage);
