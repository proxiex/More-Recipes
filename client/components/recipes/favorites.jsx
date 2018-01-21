import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginat from 'react-paginate';
import classnames from 'classnames';
import RecipeCard from '../common/recipeCard';
import { getFavoriteRecipeAction } from '../../actions/getFavoriteRecipe';
import shortid from 'shortid';
class Favorites extends React.Component {
  constructor(){
    super()
    this.state = {
      recipes: []
    }
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.props.getFavoriteRecipeAction(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.favorites.recipes,
      pageCount: nextProps.favorites.pageCount
    })
  }

  onPageChange(page) {
    const userId = this.props.match.params.userId;
    const currentPage = page.selected + 1;
    this.props.getFavoriteRecipeAction(this.props.auth.user.id, currentPage);
  }
  
  render () {
   const { recipes } = this.state;

    const favoritesRecipes = recipes.map(recipe =>
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

            <div className="row center">         
              <ReactPaginat
                previousLabel={'chevron_left'}
                nextLabel={"chevron_right"}
                breakLabel={<a href="">...</a>}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.onPageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
              
                pageClassName="page-item, waves-effect"
                pageLinkClassName="page-link"
                activeClassName="page-item active"
                previousClassName="material-icons"
                nextClassName="material-icons"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
               />
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
