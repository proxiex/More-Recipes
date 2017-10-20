import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/signinActions';


class NavigationBar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render () {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <div>
        
        <ul className="right hide-on-med-and-down">
          <li id="welcome">{ isAuthenticated ? <span> Welcome User </span> : '' }  </li>
          <li><Link className="active" to="index.html">Home</Link ></li>
          <li>
              <Link to="" className="dropdown-button" data-activates="recipes">
                  Recipes
                  <i className="material-icons right">arrow_drop_down</i>
              </Link >
          </li>
          <li>
              <Link to="" className="dropdown-button" data-activates="dropdown1">                                
                  Menu
                  <i className="material-icons right">arrow_drop_down</i>
              </Link >
          </li>
        </ul>
        <ul id="recipes" className="dropdown-content">
            <li><Link to="my_recipes.html"><i className="material-icons">view_list</i>Mine</Link ></li>
            <li><Link to="recipes.html"><i className="material-icons">view_list</i>View</Link ></li>
            <li><Link to="add_recipes.html"><i className="material-icons">note_add</i>Add</Link ></li>
            <li><Link to="favorite.html"><i className="material-icons">favorite</i> Fav's</Link ></li>
            <li><Link to="trash.html"><i className="material-icons">delete</i>Trash</Link ></li>
        </ul>

        <ul id="dropdown1" className="dropdown-content">
            <li><Link to="profile.html"><i className="material-icons">account_circle</i>Profile</Link ></li>
            <li><Link to="notifications.html"><i className="material-icons">notifications</i><span className="new badge red">4</span> Notifications </Link ></li>
            <li><Link to="settings.html"><i className="material-icons">settings</i>Settings</Link ></li>
            <li className="divider"></li>
            <li><a to="/logout" onClick={this.logout.bind(this)}><i className="material-icons">exit_to_app</i> Logout</a></li>
        </ul>

        <ul id="nav-mobile" className="side-nav">
            <li><Link to="index.html"><i className="material-icons">home</i>Home</Link ></li>
            <li><Link to="my_recipes.html"><i className="material-icons">view_list</i>My Recipes</Link ></li>                        
            <li><Link to="recipes.html"><i className="material-icons">view_list</i>View Recipes</Link ></li>
            <li><Link to="add_recipes.html"><i className="material-icons">note_add</i>Add Recipes </Link ></li>
            <li><Link to="index.html"><i className="material-icons">favorite</i>Favorite</Link ></li>
            <li><Link to="trash.html"><i className="material-icons">delete</i>Trash</Link ></li>
            <li><Link to="profile.html"><i className="material-icons">account_circle</i>Profile</Link ></li>
            <li><Link to="notifications.html"><i className="material-icons">notifications</i><span className="new badge red">4</span> Notifications </Link ></li>
            <li><Link to="settings.html"><i className="material-icons">settings</i>Settings</Link ></li>
            <li className="divider"></li>
            <li><a to="/logout" onClick={this.logout.bind(this)}><i className="material-icons">exit_to_app</i> Logout</a></li>
        </ul>
      </div>
    );

    const viewerLinks = (
      <div >
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
        <nav className="white" role="navigation">
          <div className="nav-wrapper padding-left" >
            <Link to="/" id="logo-container" className="brand-logo">More Recipes</Link>

            { isAuthenticated ? userLinks : viewerLinks }

             { isAuthenticated ? <ul><li className="right black-text hide-on-large-only">Welcom user &nbsp;&nbsp;&nbsp;</li></ul>: '' }
            <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>            
          </div>
        </nav>
      </div>
    )
  }
};

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps, { logout })(NavigationBar);