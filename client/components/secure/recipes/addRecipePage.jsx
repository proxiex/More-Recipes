import React from 'react';
import AddRecipeForm from './addRecipeForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addRecipeAction } from '../../../actions/addRecipeAction';

class AddRecipePage extends React.Component {
  render () {
    const { addRecipeAction } = this.props;
    return (
      <div id="wrapper" className="contiainer center">
        <AddRecipeForm addRecipeAction={addRecipeAction}  />
      </div>
    );
  }
}

AddRecipePage.propTypes = {
  addRecipeAction: PropTypes.func.isRequired
}

export default connect(null, { addRecipeAction })(AddRecipePage);