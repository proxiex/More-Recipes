import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Materialize = window.Materialize;

export default function(ComposedComponent) {
  class Authenticate extends Component {

    render() {
       if (!this.props.isAuthenticated) {
        Materialize.toast('Login to proceed', 4000, 'red darken-3');
        return <Redirect to="/signin" />
      }
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated
    };
  }

  return connect(mapStateToProps)(Authenticate);
}