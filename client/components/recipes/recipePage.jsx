import React, { Component } from 'react';
import ReactPaginat from 'react-paginate';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getAllRecipeAction } from '../../actions/recipes/getAllRecipe';
import { getPopularRecipeAction } from '../../actions/recipes/getPopularRecipe';
import RecipeCard from '../common/recipeCard';
import Search from '../common/search';
import Preloader from '../common/preLoaders';

/**
 *
 *
 * @class RecipePage
 * @extends {React.Component}
 */
export class RecipePage extends Component {
  /**
   * Creates an instance of RecipePage.
   * @param {any} props
   * @memberof RecipePage
   */
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      popularRecipe: [],
      page: 1,
      pageCount: 0,
      isLoading: true,
      paginate: true
    };
    // this.getAllRecipe = this.getAllRecipe.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
   * @returns {void}
   *
   * @memberof RecipePage
   */
  componentWillMount() {
    this.props.getAllRecipeAction().then(() => {
      this.setState({
        isLoading: false
      });
    });
    this.props.getPopularRecipeAction();
  }

  /**
    * @returns {void}
    *
    * @param {any} nextProps
    * @memberof RecipePage
    */
  componentWillReceiveProps(nextProps) {
    this.setState({
      popularRecipe: nextProps.popularRecipe,
      recipes: nextProps.recipe.recipes,
      message: nextProps.recipe.message,
      pageCount: nextProps.recipe.pageCount || 0
    });
  }

  /**
   * @return {void}
   *
   * @param {any} page
   * @memberof RecipePage
   */
  onPageChange(page) {
    const currentPage = page.selected + 1;
    this.setState({
      isLoading: true
    });
    this.props.getAllRecipeAction(currentPage).then(() => {
      this.setState({
        isLoading: false,
        paginate: true

      });
    });
  }

  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const {
      recipes, message, isLoading, paginate
    } = this.state;
    const { isAuthenticated } = this.props.auth;

    const allRecipes = typeof recipes === 'object' ? recipes.map(recipe =>

      (<RecipeCard
        key={shortid.generate()}
        id={recipe.id}
        recipeName={recipe.recipeName}
        recipeImage={recipe.recipeImage}
        views={recipe.views}
        downVotes={recipe.downVotes}
        upVotes={recipe.upVotes}
        userId={recipe.user.id}
        username={recipe.user.username}
      />)) :
      (<div style={{ textAlign: 'center', padding: '5%', paddingBottom: '20%' }}>
        <h5>{message}</h5>
       </div>);

    const otherDetails = (
      <div className="col m4">
        <div className="row">
          <div className="col s12 m12">
            <div className="card">
              <div className="row">
                <div className="col s12 m12">
                  <Search />
                </div>
              </div>
              <div className="row">
                <div className="col m12">
                  <h6 className="header"><u>Popular Recipes</u></h6>
                </div>
              </div>
              <div className="row">
                <div className="col s12 m12">
                  <ul className="collection">
                    { this.state.popularRecipe.map(recipe =>

                (<Link key={shortid.generate()} to={`/recipe-details/${recipe.id}`}>
                  <li className="collection-item">{recipe.recipeName}</li>
                 </Link>)) }
                  </ul>
                </div>
              </div>
              <div className="card-stacked">
                <div className="card-content" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div id="wrapper">
        <div className="row" style={{ marginBottom: '0' }}>
          <div className="col m8 transparent-bg" >
            <div className="section">
              <div className="row">
                <div className="col m4" />
                <div className="col m4">
                  <h4 className="center"> Recipes</h4>
                </div>
                <div className="col m4" />
              </div>
              <div className="row">
                { isLoading ?
                  <div className="pre-loader">
                    <Preloader />
                  </div>
                :
                allRecipes
                }
              </div>
            </div>

            {/* Pagination here */}

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
              :
              ''
            }
            </div>
          </div>
          {/* end of recipe dispalyy here */}

          { otherDetails }

        </div>
      </div>
    );
  }
}

RecipePage.propTypes = {
  getAllRecipeAction: PropTypes.func.isRequired,
  getPopularRecipeAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

/**
 *
 * @param {any} state
 * @returns {void}
 */
const mapStateToProps = state => ({
  recipe: state.recipes,
  popularRecipe: state.popularRecipe,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getAllRecipeAction,
    getPopularRecipeAction
  }
)(RecipePage);
