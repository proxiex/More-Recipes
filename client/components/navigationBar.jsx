import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/signinActions';
import classnames from 'classnames';
import FAB from './common/FAB';

import background from '../assets/imgs/post_7.jpg';
import avater from '../assets/imgs/ruth.jpg';


class NavigationBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }
  
  componentDidUpdate() {
    $(".button-collapse").sideNav();
    $(document).ready(function() {
      
      $('select').material_select();
      $('.tooltipped').tooltip({delay: 50});
    
      $('textarea#description, textarea#method').characterCounter();
      $('.carousel').carousel();
    });
    
    $('.recipes').dropdown();
    $('.dropdown-button').dropdown();
    
    (function($){
      $(function(){
    
        $('.button-collapse').sideNav();
        $('.parallax').parallax();
    
      }); // end of document ready
    })(jQuery);
  }
  
  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.setState({ redirect: true});
    $('.button-collapse').sideNav('destroy');
    <Redirect to="/" />
  }

  render () {
   
    const { isAuthenticated } = this.props.auth;
    const userLinks = (
      <div>
        <ul id="slide-out" className="side-nav">
          <li><div className="user-view">
            <div className="background">
              <img src={background} />
            </div>
            <a href="#!user"><img className="circle" src={avater} /></a>
            <a href="#!name"><span className="white-text name">Samuel Longshak</span></a>
            <a href="#!email"><span className="white-text email">samuel@andela.com</span></a>
          </div></li>
          <li><a href="profile.html"><i className="material-icons">account_circle</i>Profile</a></li>
          {/* <li><a href="notifications.html"><i className="material-icons">notifications</i><span className="new badge red">4</span> Notifications </a></li> */}
          <li><a href="settings.html"><i className="material-icons">settings</i>Settings</a></li>
          <li className="divider"></li>
          <li><a to="/logout" onClick={this.logout.bind(this)}><i className="material-icons">exit_to_app</i> Logout</a></li>
      </ul>
      <a href="#" data-activates="slide-out" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
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
        <nav className={classnames({"white": !isAuthenticated}, {"black": isAuthenticated})} role="navigation">
          <div className="nav-wrapper padding-left" >
            

            { isAuthenticated ? userLinks : viewerLinks }
            <Link to="/" id="logo-container" className="brand-logo">More Recipes</Link>
          </div>
        </nav>
    { isAuthenticated ?  <FAB /> : null }
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