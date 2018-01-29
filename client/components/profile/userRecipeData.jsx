import React from 'react';

const UserRecipeData = ({ recipeData }) => (
  <ul className="collection">
    <li className="collection-item">
        You have created {recipeData.totalRecipes } recipes
    </li>
    <li className="collection-item">
        You have { recipeData.myTotalFavorites } Favorite recipes
    </li>
    <li className="collection-item">
        You have voted for { recipeData.myRecipeTotalVotes } recipe
    </li>
    <li className="collection-item">
        Your recipes have { recipeData.myTotalVotes } votes so far
    </li>
    <li className="collection-item">
        Your recipes have been added to favorites by
      { recipeData.myRecipeTotaFavorites } users
    </li>
  </ul>
);

export default UserRecipeData;
