import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classnames from 'classnames';

import { getRecipeDetails } from '../../actions/recipes/getRecipeDetails';
import { addReviewAction } from '../../actions/reviews/addReview';
import { voteAction } from '../../actions/recipes/vote';
import { favoriteRecipeAction } from '../../actions/favorites/favoriteRecipe';
import { deleteRecipeAction } from '../../actions/recipes/deleteRecipe';

/**
 *
 *
 * @class RecipeDetails
 * @extends {React.Component}
 */
export class RecipeDetails extends React.Component {
  /**
   * Creates an instance of RecipeDetails.
   * @param {any} props
   * @memberof RecipeDetails
   */
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      recipeReviews: [],
      reviews: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.favoriteRecipe = this.favoriteRecipe.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @returns {void}
   *
   * @param {any} nextProps
   * @memberof
   */
  componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(recipeId);
    $(document).ready(() => {
      $('.modal').modal();
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} e
   * @memberof
   */
  onSubmit(e) {
    e.preventDefault();
    const recipeId = this.props.match.params.recipeId;
    const data = {
      reviews: this.state.reviews
    };
    this.props.addReviewAction(recipeId, data).then(() => {
      this.setState({
        reviews: ''
      });
    });
  }

  /**
   * @returns {void}
   *
   * @param {any} e
   * @memberof RecipeDetails
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @returns {void}
   *
   * @memberof RecipeDetails
   */
  delete() {
    const recipeId = this.props.match.params.recipeId;
    this.props.deleteRecipeAction(recipeId).then(() => {
      this.setState({
        redirect: true
      });
    });
    $('#modal').modal('close');
  }

  /**
   * @returns {void}
   *
   * @memberof RecipeDetails
   */
  upVote() {
    if (this.props.auth.isAuthenticated) {
      const recipeId = this.props.match.params.recipeId;
      this.props.voteAction(recipeId, 'up').then(() => {
        Materialize.toast(this.props.recipe.message, 3000, 'green darken-3');
      });
    } else {
      Materialize.toast('You have to be logged in to vote', 3000, 'red darken-3');
    }
  }

  /**
   * @returns {void}
   *
   * @memberof RecipeDetails
   */
  downVote() {
    if (this.props.auth.isAuthenticated) {
      const recipeId = this.props.match.params.recipeId;
      this.props.voteAction(recipeId, 'down').then(() => {
        Materialize.toast(this.props.recipe.message, 3000, 'green darken-3');
      });
    } else {
      Materialize.toast('You have to be logged in to vote', 3000, 'red darken-3');
    }
  }

  /**
  * @returns {void}
  *
  * @memberof RecipeDetails
  */
  favoriteRecipe() {
    if (this.props.auth.isAuthenticated) {
      const recipeId = this.props.match.params.recipeId;
      this.props.favoriteRecipeAction(recipeId).then(() => {
        Materialize.toast(this.props.favorites.message, 3000, 'green darken-3');
      });
    } else {
      Materialize.toast('You have to be logged in to favorite a recipe', 3000, 'red darken-3');
    }
  }

  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    const recipeInfo = this.props.recipe.recipeDetails ?
      this.props.recipe.recipeDetails : {};
    const reviewData = this.props.review ? this.props.review : [];
    const userVotes = this.props.recipe.userVotes ?
      this.props.recipe.userVotes : {};

    const review = (reviewData instanceof Array) ?
      reviewData.sort((a, b) => b.id - a.id) : reviewData;
    const { isAuthenticated, user } = this.props.auth;

    const { redirect } = this.state;

    if (redirect) {
      Materialize.toast('Your Recipe Has been Delted!', 3000, 'red darken-5');
      return <Redirect to="/my-recipes" />;
    }
    const reviewForm = (
      <div className="row">
        <div className="col m12">
          <div className="row">
            <div className="col m12">
              <form onSubmit={this.onSubmit} className="col s12">
                <div className="row">
                  <div className="input-field col m12 s12">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea
                      name="reviews"
                      value={this.state.reviews}
                      onChange={this.onChange}
                      id="review"
                      className="materialize-textarea"
                    />
                    <label htmlFor="review">Review</label>
                    <input
                      type="submit"
                      value="Post Review"
                      className="btn"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div id="wrapper">
        <div className="row" style={{ padding: '2%', marginBottom: '0' }}>
          <div className="container">
            <div className="col s12 m12 l12 transparent-bg">
              <div className="row">
                <div className="col m4">
                  <div className="card">
                    <div className="card-image">
                      <img alt="" src={recipeInfo.recipeImage} />
                    </div>
                    <div className="card-content">
                      <div className="row">
                        <span className="card-title">{recipeInfo.recipeName}</span>
                      </div>
                      <div className="row">
                        { user.id === recipeInfo.userId ?
                          <div>
                            <Link to={`/edit-recipe/${recipeInfo.id}`}>
                              <span className="edit-btn">
                              Edit
                              </span>
                            </Link>

                            <a>
                              <span
                                data-target="modal"
                                className="del-btn modal-trigger"
                              >
                              Delete
                              </span>
                            </a>

                          </div>
                      : null
                    }
                      </div>
                    </div>
                  </div>
                </div>
                {/* modals */}

                <div id="modal" className="modal">
                  <div className="modal-content">
                    <h4>Confirm Delete</h4>
                    <p>Are your sure you want to delete this recipe?</p>
                  </div>
                  <div className="modal-footer">
                    <a
                      onClick={this.delete}
                      className="modal-action
                      modal-close waves-effect
                      waves-green btn-flat red-text"
                    >
                      Yes
                    </a>
                    <a className="modal-action
                    modal-close waves-effect
                    waves-green btn-flat"
                    >No
                    </a>
                  </div>
                </div>

                {/* end of modals */}
                <div className="col m8">
                  <div className="row">
                    <p className="justify">
                      {recipeInfo.description}
                    </p>
                  </div>
                  <div className="row">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <span className="">
                              <a
                                onClick={this.favoriteRecipe}
                                style={{ cursor: 'pointer' }}
                              >
                                <i className={classnames(
                                  'material-icons',
                                  { 'teal-text': userVotes.upotes }
                                    )
                                  }
                                >
                                  favorite
                                </i>
                              </a>
                                Favorite
                            </span>
                          </td>
                          <td>
                            <span>
                              <i className="material-icons">
                                    remove_red_eye
                              </i>
                              {recipeInfo.views} Views
                            </span>
                          </td>
                          <td>
                            <span className="">
                              <a
                                onClick={this.upVote}
                                style={{ cursor: 'pointer' }}
                              >
                                <i className={classnames(
                                  'material-icons',
                                  { 'teal-text': userVotes.upVotes }
                                  )
                                }
                                >
                                  thumb_up
                                </i>
                              </a>
                              {recipeInfo.upVotes} Like
                            </span>
                          </td>
                          <td>
                            <span className="">
                              <a
                                onClick={this.downVote}
                                style={{ cursor: 'pointer' }}
                              >
                                <i className={classnames(
                                  'material-icons',
                                  { 'teal-text': userVotes.downVotes }
                                  )}
                                >
                                  thumb_down
                                </i>
                              </a>{recipeInfo.downVotes} Dislike
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="row white">
                <div className="col m4">
                  <h5 className="center">Ingredients</h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: recipeInfo.ingredients
                         }}
                  />
                </div>
                <div className="col m8">
                  <h5 className="center">Prepration</h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: recipeInfo.instructions
                      }}
                  />
                </div>
              </div>

              {isAuthenticated ? reviewForm : null}

              <div className="row white">
                <div className="col m12">
                  <h5 className="center">Reiviews</h5>

                  { (review instanceof Array) ?

                    review.map(reviewInfo =>
                      (
                        <div key={shortid.generate()} className="row">
                          <div className="">
                            <div className="col s12 m8 offset-m2 l6 offset-l3">
                              <div
                                className="card-panel grey lighten-5 z-depth-1"
                              >
                                <div className="row valign-wrapper">
                                  <div className="col s2">
                                    <img
                                      src="imgs/ruth.jpg"
                                      alt=""
                                      className="circle responsive-img"
                                    />
                                  </div>
                                  <div className="col s10">
                                    <span className="black-text">
                                      {reviewInfo.review}
                                    </span>
                                    {
                                      reviewInfo.user ?
                                        <div className="row">
                                          <div className="col m3">
                                            <img
                                              className="review-img"
                                              src={reviewInfo.user.avatar}
                                              alt="avatar"
                                            />
                                          </div>
                                          <div className="col m9">
                                            <p>{reviewInfo.user.username} </p>
                                          </div>
                                        </div>
                                      : null
                                    }
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>)) :
                    <div className="row white">
                      <div className="col m12">
                        <div className="row">
                          <div className="">
                            <p className="center"> {review} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  getRecipeDetails: PropTypes.func.isRequired,
  voteAction: PropTypes.func.isRequired,
  addReviewAction: PropTypes.func.isRequired,
  favoriteRecipeAction: PropTypes.func.isRequired,
  deleteRecipeAction: PropTypes.func.isRequired
};

/**
 *
 * @param {any} state
 * @returns {void}
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
    recipe: state.recipe,
    review: state.review,
    favorites: state.favorites
  };
}


export default connect(mapStateToProps, {
  voteAction, addReviewAction, getRecipeDetails, favoriteRecipeAction, deleteRecipeAction
})(RecipeDetails);
