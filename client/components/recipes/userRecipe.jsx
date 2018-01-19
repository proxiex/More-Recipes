import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { getUserRecipesActon } from '../../actions/getUserRecipeAction';
import RecipeCard from '../common/recipeCard';
class UserRecip extends Component {
  
  componentDidMount() {
    // call action here   
    const userId = this.props.match.params.userId;
    console.log('userId here >>>>', userId);
    this.props.getUserRecipesActon(userId)
    
  }

  

  render() {
    const userRecipe = this.props.userRecipe ?  this.props.userRecipe : [];
   
    const userId = this.props.match.params.userId;
    const userRecipes = userRecipe.map(recipe =>
      <RecipeCard
        key={shortid.generate()}
        id={recipe.id}
        recipeName={recipe.recipeName} 
        recipeImage={recipe.recipeImage} 
        views={recipe.views} 
        downVotes={recipe.downVotes} 
        upVotes={recipe.upVotes}
        userLName='me'
        userFName='ok'
        userId={1}
      />
    )
    const noRecipes = (
      <div style={{ textAlign: 'center', padding: '5%', paddingBottom: '20%'}}>
        <h5>You have not created any recipes yet.</h5>
      </div>
    )
    return (
      <div id="wrapper">
        <div className="row" style={{marginBottom: '0'}}>
          <div className='col m8 transparent-bg my-recipe'>
            <div className="section">
              <div className="row">
                <div className="col m4"></div>
                <div className="col m4"><h4 className="center">My Recipes</h4></div>
                <div className="col m4">
                </div>
              </div>
              <div className="row">
                {userRecipes.length > 0 ?  userRecipes : noRecipes }
              </div>
            </div> 

            {/* Pagination here */}

            <div className="row">         
              <ul className="pagination center">
                <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
                <li className="active teal"><a href="#!">1</a></li>
                <li className="waves-effect"><a href="#!">2</a></li>
                <li className="waves-effect"><a href="#!">3</a></li>
                <li className="waves-effect"><a href="#!">4</a></li>
                <li className="waves-effect"><a href="#!">5</a></li>
                <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
              </ul>
            </div>
          </div>
          {/* end of recipe dispalyy here */}
          
        </div>
      </div>
    );
  }
  
} 

UserRecip.propTypes = {
  getUserRecipesActon: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    userRecipe: state.userRecipe
  }
}

export default connect(mapStateToProps, { getUserRecipesActon })(UserRecip);