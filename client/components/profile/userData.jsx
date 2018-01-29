import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/textFieldGroup';
import Preloader from '../common/preLoaders';

import {
  updatetUserProfileAction,
  updatetUserPasswordAction
} from '../../actions/updateUserProfile';

import * as firebase from 'firebase';
/**
 *
 *
 * @class UserData
 * @extends {Component}
 */
class UserData extends Component {
  /**
   * Creates an instance of UserData.
   * @param {any} props
   * @memberof UserData
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      oldPassword: '',
      newPassword: '',
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.getPhoto = this.getPhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  /**
   *
   * @returns {void}
   * @param {any} nextProps
   * @memberof UserData
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      firstName: nextProps.userData.firstName ?
        nextProps.userData.firstName : '',
      lastName: nextProps.userData.lastName ? nextProps.userData.lastName : '',
      username: nextProps.userData.username
    });
  }

  /**
   * @returns {void}
   * @param {any} e
   * @memberof UserData
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  /**
   * @returns {void}
   * @param {any} e
   * @memberof UserData
   */
  onSubmit(e) {
    e.preventDefault();
    const storage = firebase.storage();
    const url = `images/profile_${this.state.username
      .split(' ').join('_')}_${Date.now()}.jpg`;
    const storageRef = storage.ref(url);
    const message = this.state.imageUrl;

    this.setState({ errors: {}, isLoading: true });

    const uploadTask = storageRef
      .putString(message, 'data_url').then((snapshot) => {
        const downloadURL = snapshot.downloadURL;
        const newData = this.state;
        newData.imageUrl = '';
        newData.avatar = downloadURL;
        console.log('Submited State', this.state);

        this.props.updatetUserProfileAction(this.state).then(
          (res) => {
            this.setState({ redirect: true, isLoading: false });
            Materialize.toast(
              'Your profile updated sucessfully',
              3000,
              'green darken-3'
            );
          },
          (err) => {
            Materialize.toast(err.response.data.message, 3000, 'red darken-3');
            this.setState({ errors: err.response.data, isLoading: false });
          }
        );
      });
  }

  /**
   * @returns {void}
   *
   * @param {any} e
   * @memberof UserData
   */
  getPhoto(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  /**
 *
 * @returns {null} null
 * @param {any} e
 * @memberof UserData
 */
  changePassword(e) {
    e.preventDefault();
    const passwords = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };
    this.props.updatetUserPasswordAction(passwords).then(
      (res) => {
        this.setState({ redirect: true, isLoading: false });
        console.log(res);
        Materialize.toast(
          'Your password has been updated sucessfully',
          3000,
          'green darken-3'
        );
      },
      (err) => {
        console.log('error >>>', err.response);
        Materialize.toast(err.response.data.message, 3000, 'red darken-3');
        this.setState({ errors: err.response.data, isLoading: false });
      }
    );
  }
  /**
   *
   *
   * @returns {void}
   * @memberof UserData
   */
  render() {
    const data = this.props.userData;
    return (
      <div className="row">
        <div className="col m5 s12">
          <form onSubmit={this.onSubmit} encType="multipart/form-data">
            <div className="file-field input-field">
              <div className="btn">
                <span>Profile Image</span>
                <input
                  type="file"
                  onChange={this.getPhoto}
                  name="profileImage"
                />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
              </div>
            </div>
            <TextFieldGroup
              value={this.state.firstName}
              onChange={this.onChange}
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              error=""
            />

            <TextFieldGroup
              value={this.state.lastName}
              onChange={this.onChange}
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              error=""
            />
            <div className="row">
              {this.state.isLoading ?
                <span> <Preloader /> Updating... </span> : <input
                  type="submit"
                  value="Update profile"
                  className="btn black-text grey lighten-2"
                  disabled=""
                /> }
            </div>

          </form>
        </div>
        <form onSubmit={this.changePassword} encType="multipart/form-data" >
          <div className="col m5 s12">
            <TextFieldGroup
              value={this.state.oldPassword}
              onChange={this.onChange}
              id="password"
              name="oldPassword"
              label="Old password"
              type="password"
              error=""
            />
            <TextFieldGroup
              value={this.state.newPassword}
              onChange={this.onChange}
              id="confirmPassword"
              name="newPassword"
              label="New password"
              type="password"
              error=""
            />

            <div className="row">
              <input
                type="submit"
                value="Change password"
                className="btn black-text grey lighten-2"
                disabled=""
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  {
    updatetUserPasswordAction,
    updatetUserProfileAction
  }
)(UserData);
