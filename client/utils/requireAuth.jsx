import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Materialize = window.Materialize;
/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {void}
 */
export default function (ComposedComponent) {
  /**
   *
   *
   * @class Authenticate
   * @extends {Component}
   */
  class Authenticate extends Component {
    /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
    render() {
      if (!this.props.isAuthenticated) {
        Materialize.toast('Login to proceed', 4000, 'red darken-3');
        return <Redirect to="/signin" />;
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  /**
   *
   *
   * @param {any} state
   * @returns {void}
   */
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(Authenticate);
}
