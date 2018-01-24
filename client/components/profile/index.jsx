import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import UserData from './userData';
import UserRecipeData from './userRecipeData';
import TextFieldGroup from '../common/textFieldGroup';
import { getUserProfileAction } from '../../actions/getUserDetailsAction';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      UserData: {},
      recipeData: []
    }
  }

  componentDidMount() {

    this.props.getUserProfileAction();
    $('ul.tabs').tabs({ swipeable: true });
    $('.button-collapse').sideNav('destroy');
  }

  componentWillReceiveProps(nextProps) {
    console.log('Props', nextProps);
    this.setState({
      UserData: nextProps.profile.UserDetails,
      recipeData: nextProps.profile.recipeDetails
    })
  }
  

  render() {
    const avatar = this.state.UserData.avatar;
    console.log('State >>>', this.state);
    return (
      <div id="wrapper">
      <div className="row"  style={{padding: '2%', marginBottom: '0'}}>
        <div className="col m8 s12 offset-m2">
          <div className="cards hovercard">
              <div className="card-background">
                  <img className="card-bkimg" alt="" src={avatar} />
              </div>
              <div className="useravatar">
                  <img alt="" src={avatar} />
              </div>
              <div className="card-info"> <span className="card-title">{this.state.UserData.username}</span>

              </div>
          </div>

          <ul id="tabs-swipe-demo" className="tabs">
            <li className="tab col s3"><a className="active"  href="#test-swipe-1">Edit profile</a></li>
            <li className="tab col s3"><a href="#test-swipe-2">Recipe info</a></li>
          </ul>
          <div id="swipe-profile p-height">
            <div id="test-swipe-1" className="col s12 white">
              <UserData userData={this.state.UserData} />
            </div>
            <div id="test-swipe-2" className="col s12 white">
            <UserRecipeData recipeData={this.state.recipeData} />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
 
}

Profile.propTypes = {
  getUserProfileAction: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    profile: state.profile  
  }
  
}

export default connect(mapStateToProps, { getUserProfileAction })(Profile);
