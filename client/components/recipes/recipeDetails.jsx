import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecipeDetails } from '../../actions/getRecipeDetails';
import { addReviewAction } from '../../actions/addReviewAction';
import { voteAction } from '../../actions/voteActions';
import shortid from 'shortid';
import classnames from 'classnames'


class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      recipeReviews: [],
      reviews: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.upVote = this.upVote.bind(this)
    this.downVote = this.downVote.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    const recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(recipeId)
  }
  
  upVote(){
    console.log('ok')
    const recipeId = this.props.match.params.recipeId;
    this.props.voteAction(recipeId, 'up')
  }
  
  downVote(){
    const recipeId = this.props.match.params.recipeId;
    this.props.voteAction(recipeId, 'down')
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('from submit', this.state)
    const recipeId = this.props.match.params.recipeId;
    const data = {
      reviews: this.state.reviews
    }
    this.props.addReviewAction(recipeId, data )
  }

  render () {
    const recipeInfo = this.props.recipe.recipeDetails ? this.props.recipe.recipeDetails : {};
    const reviewData = this.props.review ? this.props.review : {};
    const userVotes = this.props.recipe.userVotes ? this.props.recipe.userVotes : {} ;
    console.log( '>>>>>>>>>>>>>>>>>>>>', this.props.recipe)
    console.log('####### user votes ########', userVotes)
    const review = (review instanceof  Array) ? reviewData.sort(function(a, b){ return b.id - a.id }) : reviewData;
    
    const { isAuthenticated } = this.props.auth;

    const reviewForm = (
      <div className="row">
        <div className="col m12">
          <div className="row">
            <div className="col m12">
                <form onSubmit={this.onSubmit} className="col s12">
                  <div className="row">
                    <div className="input-field col m12 s12">
                      <i className="material-icons prefix">mode_edit</i>
                      <textarea name="reviews" value={this.state.reviews} onChange={this.onChange} id="review" className="materialize-textarea"></textarea>
                      <label htmlFor="review">Review</label>
                      <input type="submit" value="Post Review" className="btn" />
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div id="wrapper">
      <div className="row" style={{paddingTop: '3%', marginBottom: '0'}}>
        <div className="container">
          <div className="col s12 m12 l12 transparent-bg">            
            <div className="row">
              <div className="col m4">
                  <div className="card">
                  <div className="card-image">
                    <img src={recipeInfo.recipeImage} />
                  </div>
                  <div className="card-content">
                    <div className="row">
                      <span className="card-title">{recipeInfo.recipeName}</span>
                      <span className="teal-text">Created By: {recipeInfo.user !== undefined? recipeInfo.user.firstName + ' '+recipeInfo.user.lastName: null}</span>
                    </div>
                    <div className="row">
                      <span className="left"><a onClick={this.upVote} style={{cursor: 'pointer'}} ><i className={classnames("material-icons", { 'red-text': userVotes.upVotes })}>thumb_up</i></a> {recipeInfo.upVotes} Likes</span>
                      <span className="right"><a onClick={this.downVote} style={{cursor: 'pointer'}} ><i className={classnames("material-icons", { 'red-text': userVotes.downVotes })}>thumb_down</i></a>{recipeInfo.downVotes} Dislikes</span>                        
                    </div>
                  </div>
                </div>
              </div>
              <div className="col m8">
                <div className="row">
                  <p className="justify">
                    {recipeInfo.description}
                  </p>
                </div>
                <div className="row " style={{ padding: '5%'}}> 
                    <div className="row">
                      <div className="col m3"><span className=""><i className="material-icons">remove_red_eye</i> {recipeInfo.views} Views</span></div>
                      <div className="col m3"><span className=""><i className="material-icons">favorite</i>5 Favorites</span></div>
                      <div className="col m6">
                          <span className="">
                          <i className="material-icons teal-text">star</i> 
                          <i className="material-icons">star</i>
                          <i className="material-icons">star</i>
                          <i className="material-icons">star_half</i>
                          <i className="material-icons">star_border</i>
                          5 reviews
                        </span>
                      </div>
                    </div>
                </div>
              </div>
            </div>         
            <div className="row white">
              <div className="col m4">
                <h5 className="center">Ingredients</h5>
                <p dangerouslySetInnerHTML={{ __html:recipeInfo.ingredients}} />
              </div>
              <div className="col m8">
                <h5 className="center">Preperation</h5>
                  <p dangerouslySetInnerHTML={{ __html: recipeInfo.instructions }} />
              </div>
            </div>

            {isAuthenticated ? reviewForm : null}

          
              <div className="row white">
                <div className="col m12">
                  <h5 className="center">Reiviews</h5>

                  { (review instanceof  Array)?  
                  
                    review.map(reviewInfo =>
                  <div key={shortid.generate()} className="row">
                    <div className="">
                      <div className="col s12 m8 offset-m2 l6 offset-l3">
                        <div className="card-panel grey lighten-5 z-depth-1">
                          <div className="row valign-wrapper">
                            <div className="col s2">
                              <img src="imgs/ruth.jpg" alt="" className="circle responsive-img" />
                            </div>
                            <div className="col s10">
                              <span className="black-text">
                                {reviewInfo.review}
                              </span>
                              <p>{reviewInfo.user ? reviewInfo.user.username: null}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  ) : 
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
  addReviewAction: PropTypes.func.isRequired
}

function mapStateToProps(state) { 
  return {
    auth: state.auth,
    recipe: state.recipe,
    review: state.review
  }
}


export default connect(mapStateToProps, {voteAction, addReviewAction, getRecipeDetails })(RecipeDetails);