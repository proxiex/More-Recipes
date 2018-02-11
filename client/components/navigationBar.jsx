import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { logout } from '../actions/users/signin';
import FAB from './common/FAB';

import background from '../assets/imgs/post_7.jpg';
import avater from '../assets/imgs/ruth.jpg';

/**
 *
 *
 * @class NavigationBar
 * @extends {Component}
 */
export class NavigationBar extends Component {
  /**
   * Creates an instance of NavigationBar.
   * @param {any} props 
   * @memberof NavigationBar
   */
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  /**
   * @returns {void}
   *
   * @param {any} nextProps
   * @memberof
   */
  componentDidUpdate() {
    $('.button-collapse').sideNav();
    $('select').material_select();
    $('.tooltipped').tooltip({ delay: 50 });

    $('textarea#description, textarea#method').characterCounter();
    $('.carousel').carousel();

    $('.recipes').dropdown();
    $('.dropdown-button').dropdown();

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
  }
  /**
   *
   *
   * @param {any} e
   * @memberof NavigationBar
   * @returns {void}
   */
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.setState({ redirect: true });
    $('.button-collapse').sideNav('destroy');
  }
  /**
   *
   *
   * @returns {void}
   * @memberof NavigationBar
   */
  render() {
    const { isAuthenticated } = this.props.auth;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    const userLinks = (
      <div id="users-links">
        <ul id="slide-out" className="side-nav">
          <li>
            <div className="user-view">
              <div className="background">
                <img alt="" src={background} />
              </div>
              <a href="#!user"><img className="circle" alt="" src={avater} /></a>
              <a href="#!name">
                <span className="white-text name">
                  Samuel Longshak
                </span>
              </a>
              <a href="#!email">
                <span className="white-text email">
                  samuel@andela.com
                </span>
              </a>
            </div>
          </li>
          <li>
            <Link to="/profile">
              <i className="material-icons">account_circle</i>
              Profile
            </Link>
          </li>
          <li className="divider" />
          <li>
            <a to="/logout" onClick={this.logout.bind(this)}>
              <i className="material-icons">exit_to_app</i>
              Logout
            </a>
          </li>
        </ul>
        <a
          href="#"
          data-activates="slide-out"
          className="button-collapse show-on-large"
        >
          <i className="material-icons">menu</i>
        </a>
      </div>
    );

    const viewerLinks = (
      <div id="viewer-link" >
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
      </div>
    );

    return (
      <div className="row parallax-container-bottm">
        <nav
          className={classnames(
            { white: !isAuthenticated },
            { black: isAuthenticated }
          )}
        >
          <div className="nav-wrapper padding-left" >
            { isAuthenticated ? userLinks : viewerLinks }
            <Link to="/" id="logo-container" className="brand-logo">
              More Recipes
            </Link>
          </div>
        </nav>
        { isAuthenticated ? <FAB /> : null }
      </div>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}


export default connect(mapStateToProps, { logout })(NavigationBar);
