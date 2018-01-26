import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginat from 'react-paginate';
import shortid from 'shortid';
import { getFavoriteRecipeAction } from '../../actions/getFavoriteRecipe';
import RecipeCard from '../common/recipeCard';
import Preloader from '../common/preLoaders';

/**
 *
 *
 * @class Favorites
 * @extends {React.Component}
 */
class Favorites extends React.Component {
  /**
   * Creates an instance of Favorites.
   * @memberof Favorites
   */
  constructor() {
    super();
    this.state = {
      recipes: [],
      isLoading: true,
      paginate: true,
      pageCount: 0
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
   * @returns {void}
   *
   * @memberof Favorites
   */
  componentDidMount() {
    this.props.getFavoriteRecipeAction(this.props.auth.user.id).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} nextProps
   * @memberof Favorites
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.favorites.recipes,
      pageCount: nextProps.favorites.pageCount
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} page
   * @memberof Favorites
   */
  onPageChange(page) {
    const userId = this.props.match.params.userId;
    const currentPage = page.selected + 1;
    this.props.getFavoriteRecipeAction(this.props.auth.user.id, currentPage);
  }

  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipes, isLoading, paginate } = this.state;
    const favoritesRecipes = recipes.map(recipe =>
      (<RecipeCard
        key={shortid.generate()}
        id={recipe.recipe.id}
        recipeName={recipe.recipe.recipeName}
        recipeImage={recipe.recipe.recipeImage}
        views={recipe.recipe.views}
        downVotes={recipe.recipe.downVotes}
        upVotes={recipe.recipe.upVotes}
        userId={recipe.recipe.user.id}
        username={recipe.recipe.user.username}
        userFName={recipe.recipe.user.username}
        userLName={recipe.recipe.user.username}
      />));

    return (
      <div id="wrapper">
        <div className="row" style={{ marginBottom: '0' }}>
          <div className="col m8 transparent-bg my-recipe">
            <div className="section">
              <div className="row">
                <div className="col m4" />
                <div className="col m4">
                  <h4 className="center">Favorite Recipes</h4>
                </div>
                <div className="col m4" />
              </div>
              <div className="row">
                { isLoading ?
                  <div className="pre-loader">
                    <Preloader />
                  </div>
                :
                favoritesRecipes
                }
              </div>
            </div>

            <div className="row center">
              { !isLoading || paginate ?
                <ReactPaginat
                  previousLabel="chevron_left"
                  nextLabel="chevron_right"
                  breakLabel={<a href="">...</a>}
                  breakClassName="break-me"
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.onPageChange}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"

                  pageClassName="page-item, waves-effect"
                  pageLinkClassName="page-link"
                  activeClassName="page-item active"
                  previousClassName="material-icons"
                  nextClassName="material-icons"
                  nextLinkClassName="page-link"
                  previousLinkClassName="page-link"
                />
              : ''
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  getFavoriteRecipeAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

/**
 *
 * @param {any} state
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { getFavoriteRecipeAction })(Favorites);
