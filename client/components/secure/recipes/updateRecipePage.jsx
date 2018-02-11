import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddRecipeForm from './updateRecipeForm';
import { addRecipeAction } from '../../../actions/recipes/addRecipe';
import { getRecipeDetails } from '../../../actions/recipes/getRecipeDetails';

/**
 *
 *
 * @class UpdateRecipePage
 * @extends {React.Component}
 */
export class UpdateRecipePage extends React.Component {
  /**
   *@returns {void}
   *
   * @memberof UpdateRecipePage
   */
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(recipeId);
  }

  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { addRecipeAction } = this.props;
    const recipeInfo = this.props.recipe;

    return (
      <div id="wrapper">
        <AddRecipeForm recipeInfo={recipeInfo} id={this.props.match.params.recipeId} />
      </div>
    );
  }
}

UpdateRecipePage.propTypes = {
  addRecipeAction: PropTypes.func.isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  recipe: state.recipe
});

export default connect(
  mapStateToProps,
  { addRecipeAction, getRecipeDetails }
)(UpdateRecipePage);
