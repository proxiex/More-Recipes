import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginat from 'react-paginate';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { getUserRecipesActon } from '../../actions/users/getUserRecipe';
import RecipeCard from '../common/recipeCard';
import Preloader from '../common/preLoaders';

/**
 *
 *
 * @class UserRecip
 * @extends {Component}
 */
export class UserRecipe extends Component {
  /**
   * Creates an instance of UserRecip.
   * @memberof UserRecip
   */
  constructor() {
    super();
    this.state = {
      recipes: [],
      page: 1,
      pageCount: 0,
      isLoading: true
    };
    this.onPageChange = this.onPageChange.bind(this);
  }
  /**
   *
   * @returns {void}
   * @memberof UserRecip
   */
  componentDidMount() {
    // call action here
    const { userId } = this.props.match.params;
    this.props.getUserRecipesActon(userId).then(() => {
      this.setState({
        isLoading: false
      });
    });
  }
  /**
   *
   * @returns {void}
   * @param {any} nextProps
   * @memberof UserRecip
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.userRecipe.recipes,
      pageCount: nextProps.userRecipe.pageCount
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} page
   * @memberof UserRecip
   */
  onPageChange(page) {
    const userId = this.props.match.params.userId;
    const currentPage = page.selected + 1;
    this.props.getUserRecipesActon(userId, currentPage);
  }

  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const { recipes } = this.state;
    const { isAuthenticated } = this.props.auth;
    const userRecipes = recipes.map(recipe =>
      (<RecipeCard
        key={shortid.generate()}
        id={recipe.id}
        recipeName={recipe.recipeName}
        recipeImage={recipe.recipeImage}
        views={recipe.views}
        downVotes={recipe.downVotes}
        upVotes={recipe.upVotes}
        username={recipe.user.username}
        userId={recipe.user.id}
      />));

    const noRecipes = (
      <div style={{ textAlign: 'center', padding: '5%', paddingBottom: '20%' }}>
        <h5>You have not created any recipes yet.</h5>
      </div>
    );

    const display = (userRecipes.length > 0) ? userRecipes : noRecipes;

    return (
      <div id="wrapper">
        <div className="row" style={{ marginBottom: '0' }}>
          <div className="col m8 transparent-bg my-recipe">
            <div className="section">
              <div className="row">
                <div className="col m6 offset-m3">
                  <h4 className="center">
                    {
                    isAuthenticated ?
                    'My Recipes' :
                    `Recipes by ${this.props.match.params.userName}`

                  }
                  </h4>
                </div>
              </div>
              <div className="row">
                { this.state.isLoading ?
                  <div className="pre-loader">
                    <Preloader />
                  </div>
                  : display
                  }
              </div>
            </div>

            {/* Pagination here */}

            <div className="row center">
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
            </div>
          </div>
          {/* end of recipe dispalyy here */}

        </div>
      </div>
    );
  }
}

UserRecipe.propTypes = {
  getUserRecipesActon: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

/**
 *
 *
 * @param {any} state
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    userRecipe: state.userRecipe,
    auth: state.auth
  };
}

export default connect(mapStateToProps, { getUserRecipesActon })(UserRecipe);
