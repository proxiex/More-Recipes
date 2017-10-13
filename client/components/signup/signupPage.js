import React from 'react';
import SignupForm from './signupForm';

class SignupPage extends React.Component {
  render () {
    return (
      <div id="wrapper" className="contiainer center">
        <div className="row">
            <div className="col s12 m4 offset-m4">
              <h4 className="white-text">Signup</h4>
                <SignupForm />
            </div>      
        </div>
      </div>
    );
  }
}
export default SignupPage;