import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    axios.post('/api/v1/users/signup', this.state );
  }

  render() {
    return (
      <div className="card-panel">
        <form onSubmit={this.onSubmit} className="s12">
          <div className="row">
            <div className="input-field s12">
              <i className="material-icons prefix">account_circle</i>
              <input 
                value={this.state.username}
                onChange={this.onChange}
                id="username" 
                type="text" 
                className="validate"
                name="username"
              />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field s12">
              <i className="material-icons prefix">email</i>
              <input 
                value={this.state.email}
                onChange={this.onChange}
                id="email" 
                type="email" 
                className="validate" 
                name="email"
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field s12">
              <i className="material-icons prefix">lock</i>
              <input 
                value={this.state.password}
                onChange={this.onChange}
                id="password" 
                type="password" 
                className="validate" 
                name="password"
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <input 
              type="submit" 
              value="Signup" 
              className="btn black-text grey lighten-2" 
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

export default SignupForm;