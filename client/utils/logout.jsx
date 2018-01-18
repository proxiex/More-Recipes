import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { logout } from '../actions/signinActions';

const Logout = withRouter(({ history }) => (

  <li><a to="/logout" onClick={() => {history.push('/')}}><i className="material-icons">exit_to_app</i> Logout</a></li>

));

export default Logout;
