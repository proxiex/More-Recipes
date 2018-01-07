import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

 const RecipeCard = ({id, recipeName, recipeImage, views, downVotes, upVotes }) => {
   return (
    <div className="col s12 m4" key={id}>
      <div className="card">
        <div className="card-image">
          <img src={recipeImage} alt={recipeName +' Image'} height="230" width="400"/>
        </div>
        <div className="card-content">
          <p>By <a href="recipe_by.html">Samuel Longshak</a></p>
          <Link to={`/recipe-details/${id}`}><span className="card-title">{recipeName}</span></Link>
          <div className="divider"></div>
          <div className="row">
            <div className="col m4"><span className="left"><i className="material-icons">remove_red_eye</i>{views}</span></div>
            <div className="col m4"><span className="right"><i className="material-icons">thumb_down</i> {downVotes}</span></div>  
            <div className="col m4"> &nbsp;&nbsp;&nbsp; <span className=""><i className="material-icons">thumb_up</i>{upVotes}</span></div>
          </div>
        </div>
      </div>
    </div>  
   )
 };

 RecipeCard.propTypes = {
   id: PropTypes.number.isRequired,
   recipeName: PropTypes.string.isRequired,
   recipeImage: PropTypes.string.isRequired,
   views: PropTypes.number.isRequired,
   downVotes: PropTypes.number.isRequired,
   upVotes: PropTypes.number.isRequired
 }

 export default RecipeCard;
