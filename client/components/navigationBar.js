import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div className="row parallax-container-bottm">
      <nav className="white" role="navigation">
        <div className="nav-wrapper padding-left" >
          <Link to="/" id="logo-container" className="brand-logo">More Recipes</Link>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/" className="active" >Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/signin">Signin</Link></li>
          </ul>

          <ul id="nav-mobile" className="side-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/signin">Signin</Link></li>
          </ul>
          <a to="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
        </div>
      </nav>
    </div>
  )
};