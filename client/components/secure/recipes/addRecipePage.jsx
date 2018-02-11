import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AddRecipeForm } from './addRecipeForm';
import { addRecipeAction } from '../../../actions/recipes/addRecipe';
/**
 *
 *
 * @class AddRecipePage
 * @extends {Component}
 */
export class AddRecipePage extends Component {
  /**
   *
   *
   * @returns {void}
   * @memberof AddRecipePage
   */
  render() {
    const { addRecipeAction } = this.props;
    return (
      <div id="wrapper" className="contiainer center">
        <AddRecipeForm addRecipeAction={addRecipeAction} />
      </div>
    );
  }
}

AddRecipePage.propTypes = {
  addRecipeAction: PropTypes.func.isRequired
};

export default connect(null, { addRecipeAction })(AddRecipePage);
