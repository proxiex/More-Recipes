import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RecipeCard from '../common/recipeCard';
import { getFavoriteRecipeAction } from '../../actions/getFavoriteRecipe';
import shortid from 'shortid';
class Favorites extends React.Component {

  componentDidMount() {
    this.props.getFavoriteRecipeAction(this.props.auth.user.id);
  }
  
  render () {
   const favorites = this.props.favorites;

   console.log('from heree', favorites)

    const favoritesRecipes = favorites.map(recipe =>
      <RecipeCard
        key={shortid.generate()}
        id={recipe.recipe.id}
        recipeName={recipe.recipe.recipeName} 
        recipeImage={recipe.recipe.recipeImage} 
        views={recipe.recipe.views} 
        downVotes={recipe.recipe.downVotes} 
        upVotes={recipe.recipe.upVotes}
      />  
    )

    return (
    <div id="wrapper">
        <div className="row" style={{marginBottom: '0'}}>
          <div className='col m8 transparent-bg my-recipe'>
            <div className="section">
              <div className="row">
                <div className="col m4"></div>
                <div className="col m4"><h4 className="center">Favorite Recipes</h4></div>
                <div className="col m4">
                </div>
              </div>
              <div className="row">
                {favoritesRecipes}
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
};

Favorites.propTypes = {
  getFavoriteRecipeAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getFavoriteRecipeAction })(Favorites);
