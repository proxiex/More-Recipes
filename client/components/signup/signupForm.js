import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/textFieldGroup';
import validateInput from './validations';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.setState({ redirect: true});
          console.log('you are bening redirected ....')
        },
        ({ data }) => this.setState({ errors: data })
      );
    }
  }

  render() {
    const { errors } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="card-panel">
        <form onSubmit={this.onSubmit} className="s12">
          <TextFieldGroup 
            icon="account_circle"
            value={this.state.username}
            onChange={this.onChange}
            id="username"
            name="username"
            label="Username"
            type="text"
            error={errors.username}
          />
          <TextFieldGroup 
            icon="email"
            value={this.state.email}
            onChange={this.onChange}
            id="email"
            name="email"
            label="Email"
            type="text"
            error={errors.email}
          />
          <TextFieldGroup 
            icon="lock"
            value={this.state.password}
            onChange={this.onChange}
            id="password"
            name="password"
            label="Password"
            type="password"
            error={errors.password}
          />
          <div className="row">
            <input 
              type="submit" 
              value="Signup" 
              className="btn black-text grey lighten-2" 
              disabled={this.state.isLoading}
            />
          </div>
          <div className="row">
            <p className="center">or <br/><Link to="/signin" >Signin</Link></p>
          </div>
        </form>
      </div>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
  
}

export default SignupForm;