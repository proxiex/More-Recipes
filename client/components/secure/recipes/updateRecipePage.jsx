import React from 'react';
import AddRecipeForm from './updateRecipeForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipeAction } from '../../../actions/addRecipeAction';
import { getRecipeDetails } from '../../../actions/getRecipeDetails';

class UpdateRecipePage extends React.Component {

  componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(recipeId)
  }

  render () {
    const { addRecipeAction } = this.props;
    const recipeInfo = this.props.recipe
    
    return (
      <div id="wrapper">
        <AddRecipeForm recipeInfo={recipeInfo} id={this.props.match.params.recipeId}  />
      </div>
    );
  }
}

UpdateRecipePage.propTypes = {
  addRecipeAction: PropTypes.func.isRequired,
  getRecipeDetails: PropTypes.func.isRequired
}

function mapStateToProps(state) { 
  return {
    auth: state.auth,
    recipe: state.recipe
  }
}

export default connect(mapStateToProps, { addRecipeAction, getRecipeDetails })(UpdateRecipePage);