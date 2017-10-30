import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecipeDetails } from '../../actions/getRecipeDetails';

class RecipeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      reviews: []
    }
  }

  componentWillMount() {
    
    const recipeId = this.props.match.params.recipeId;
    this.props.getRecipeDetails(recipeId).then( 
      (details) => {
      this.setState({
        details: details.data.recipeDetails,
        reviews: details.data.reviews
      })
    })
  }

  render () {
    const recipeInfo = this.state.details;
    const review = this.state.reviews;
  return (
    <div className="row" style={{marginTop: '3%'}}>
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
                    <span className="teal-text">Created By: Samuel Longshak</span>
                  </div>
                  <div className="row">
                    <span className="left"><a onClick={alert('up')} href="#"><i className="material-icons">thumb_up</i></a> {recipeInfo.upVotes} Likes</span>
                    <span className="right"><a href="#"><i className="material-icons">thumb_down</i></a>{recipeInfo.downVotes} Dislikes</span>                        
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
              <p>                  
               {recipeInfo.ingredients}
              </p>
            </div>
            <div className="col m8">
              <h5 className="center">Preperation</h5>
                {recipeInfo.method}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

RecipeDetails.propTypes = {
  getRecipeDetails: PropTypes.func.isRequired
}

export default connect(null, { getRecipeDetails })(RecipeDetails);