import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/textFieldGroup';
import { userSigninRequest } from '../../actions/users/signin';
import validateInput from './validations';
import Preloader from '../common/preLoaders';
/**
 * signin compontent
 *
 * @class SigninForm
 * @extends {React.Component}
 */
export class SigninForm extends React.Component {
  /**
   * Creates an instance of SigninForm.
   * @param {any} props
   * @memberof SigninForm
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @param {any} nextProps
   * @memberof SigninForm
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.error.length !== undefined) {
      Materialize.toast(nextProps.error.message, 3000, 'red darken-3');
      this.setState({
        isLoading: false
      });
    } else {
      this.setState({ redirect: true });
    }
  }

  /**
   * @returns {void}
   *
   * @param {any} e
   * @memberof SigninForm
   */
  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      this.props.userSigninRequest(this.state);
    }
  }

  /**
   *
   * @returns {void}
   * @param {any} e
   * @memberof SigninForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   *
   *
   * @returns {void}
   * @memberof SigninForm
   */
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  /**
   *
   *
   * @returns {void}
   * @memberof SigninForm
   */
  render() {
    const { errors, redirect, isLoading } = this.state;

    if (redirect) {
      Materialize.toast('Welcome to More Recipe!', 3000, 'green darken-3');
      
      return <Redirect to="/recipes" />;
    }
    return (
      <div className="card-panel">
        { redirect ? <div className="green-text green lighten-4"> Loggin you in... <br /></div> : ''}
        <br />
        <form onSubmit={this.onSubmit} className="s12">
          <TextFieldGroup
            icon="account_circle"
            value={this.state.username}
            onChange={this.onChange}
            id="username"
            name="username"
            label="Username or Email"
            type="text"
            error={errors.username || errors.erusername}
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
          {
            isLoading && !redirect ? <span> Checking Login Credeintials ... <Preloader /> </span> :
            <div className="row">
              <input
                type="submit"
                value="Signin"
                className="btn black-text grey lighten-2"
                disabled={this.state.isLoading}
              />
            </div>
          }
          <div className="row">
            <p className="center">or <br /><Link to="/signup" >Signup</Link></p>
          </div>
        </form>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

SigninForm.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.auth.error
});
export default connect(mapStateToProps, { userSigninRequest })(SigninForm);
