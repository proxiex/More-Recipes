[![Build Status](https://travis-ci.org/proxiex/More-Recipes.svg)](https://travis-ci.org/proxiex/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/proxiex/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/proxiex/More-Recipes?branch=develop)
[![Code Climate](https://codeclimate.com/github/proxiex/More-Recipes.png)](https://codeclimate.com/github/proxiex/More-Recipes)


# MORE-RECIPES

<b>App's Location </b>http://more-recipes27.herokuapp.com/

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Front-end: React/Redux + Bootstrap (Yet be Implemented)</li>
  <li>Back-end: Node/Expressjs + Sequelize/Postgres</li>
  <li>Libraries: jsonwebtoken, ES6, Babel-CLI, eslint, Mocha/Chai</li>
  <li>Postman</li>
</ul>

<h3>Usage</h3>
<ul>
    <li>Clone or download the repo</li>
    <li>npm install - to install the dependencies need by the app</li>
    <li>npm start - to run the app</li>
</ul>
<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
      <th>Data</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signup</td>
      <td>Create a new user</td>
      <td>
      {
          username: 'username',
          email: 'email@email.com'
          password: 'password'
      }
      </td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signin</td>
      <td>Login to the app</td>
      <td></td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes</td>
      <td>Creates New Recipe</td>
      <td>
      {
          username: 'username',
          password: 'password'
      }
      </td>      
  </tr>

  <tr>
      <td>GET</td>
      <td>/api/v1/recipes/</td>
      <td>Get all recipes</td>
      <td><i>null</i></td>      
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/recipes/:recipeId</td>
      <td>Get Specific recipe details</td>
      <td>{recipeId as params}</td>            
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/recipes/:userId</td>
      <td>Get recipes of a specific user</td>
      <td></td>            
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/recipes/:recipeId</td>
      <td>Modify Recipe information</td>
      <td></td>                  
  </tr>

  <tr>
      <td>DELETE</td>
      <td>/api/v1/recipes/:recipeId</td>
      <td>Delete a recipe</td>
      <td></td>      
  </tr>
  
   <tr>
      <td>GET</td>
      <td>/api/v1/recipes/?sort=upVote&order=desc</td>
      <td>Get all recipes, sorted by upvotes</td>
      <td>{sort=upVote&order=desc}</td>      
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/recipes/:recipeId/reviews </td>
      <td>Post a review</td>
      <td>{RecipeId}</td>      
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/users/:recipeId/favorite </td>
      <td>Favorite a recipe</td>
      <td>{recipeId}</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/users/:userId/favorite </td>
      <td>Get Favorite recipes</td>
      <td>{recipeId}</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/recipes/:recipeId/votes?vote=up </td>
      <td>Up vote a recipe</td>
      <td>{query = up}</td>
  </tr>
   <tr>
      <td>POST</td>
      <td>/api/recipes/:recipeId/votes?vote=down </td>
      <td>Down vote a recipe</td>
      <td>{query = down}</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/users/me</td>
      <td>Get user profile details</td>
      <td>{<i>null</i>}</td>
  </tr>
</table>

