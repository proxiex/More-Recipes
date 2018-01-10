import React from 'react';
import { getAllRecipeAction } from '../../actions/getAllRecipeAction';
import RecipeCard from '../common/recipeCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import shortid from 'shortid';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    }
    //this.getAllRecipe = this.getAllRecipe.bind(this);
  }

  
  componentWillMount() {
    this.props.getAllRecipeAction()
  }
 
  render () {
    const { recipes } = this.state;
    const recipe2  = this.props.recipe;
    const { isAuthenticated } = this.props.auth;
    
    const allRecipes = recipe2.map(recipe =>
      
      <RecipeCard
        key={shortid.generate()}
        id={recipe.id}
        recipeName={recipe.recipeName} 
        recipeImage={recipe.recipeImage} 
        views={recipe.views} 
        downVotes={recipe.downVotes} 
        upVotes={recipe.upVotes}
        userId={recipe.user.id}
        userName={`${recipe.user.firstName} ${recipe.user.lastName}`}
      />  
    )

    const otherDetails = (
      <div className="col m4">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="row">
                <div className="col s12 m12">
                  <form>
                    <div className="input-field s12">
                      <input id="search" type="search" required className="validate" />
                      <label htmlFor="search">Search for Recipes</label>
                    </div>  
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col m12"> <h6 className="header"><u>Popular Recipes</u></h6></div>        
              </div>
              <div className="row">      
                <div className="col s12 m12">
                  <ul className="collection">
                    <li className="collection-item">Rice and Beans </li>
                    <li className="collection-item">Chin chin</li>
                    <li className="collection-item">Yam & Egg source</li>
                    <li className="collection-item"></li>
                  </ul>
                </div> 
              </div>
              <div className="row">
                <div className="col m12"> <h6 className="header"><u>Favorited Recipes</u></h6></div>        
              </div>
              <div className="row">      
                <div className="col s12 m12">
                  <ul className="collection">
                    <li className="collection-item">Rice and Beans </li>
                    <li className="collection-item">Chin chin</li>
                    <li className="collection-item">Yam & Egg source</li>
                    <li className="collection-item"></li>
                  </ul>
                </div> 
              </div>

              <div className="card-stacked">
                <div className="card-content">

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div id="wrapper">
        <div className="row" style={{marginBottom: '0'}}>
          <div className={ classnames('col m8 transparent-bg', {'my-recipe': isAuthenticated } ) }>
            <div className="section">
              <div className="row">
                <div className="col m4"></div>
                <div className="col m4"><h4 className="center"> {isAuthenticated ? 'My': null} Recipes</h4></div>
                <div className="col m4">
                </div>
              </div>
              <div className="row">
                {allRecipes}
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
          
          { isAuthenticated ? null : otherDetails }
          
        </div>
      </div>
    );
  }
}

RecipePage.propTypes = {
  getAllRecipeAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    recipe: state.recipes,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { getAllRecipeAction })(RecipePage);