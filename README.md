[![Build Status](https://travis-ci.org/proxiex/More-Recipes.svg)](https://travis-ci.org/proxiex/More-Recipes)
[![Code Climate](https://codeclimate.com/github/proxiex/More-Recipes.png)](https://codeclimate.com/github/proxiex/More-Recipes)


# MORE-RECIPES
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they 
have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on 
More-Recipes and  get feedback in form of reviews and votes from other users who explore that 
recipe. Users can also keep a list of their favorite recipes on the application. 

<b>App's Location </b>http://more-recipes27.herokuapp.com/

<h3>TECHNOLOGIES USED</h3>
<hr>
<ul>
  <li>Front-end: React/Redux + Bootstrap (Yet be Implemented)</li>
  <li>Back-end: Node/Expressjs + Sequelize/Postgres</li>
  <li>Libraries: jsonwebtoken, ES6, Babel-CLI, eslint, Mocha/Chai</li>
  <li>Postman</li>
</ul>

<h3>API ENDPOINTS</h3>
<hr>
<table>
  <tr>
      <th>Request</th>
      <th>End Point</th>
      <th>Action</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signup</td>
      <td>Create an account</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/signin</td>
      <td>Login to the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/recipes</td>
      <td>Creates New Recipe</td>
  </tr>  
  <tr>
      <td>DELETE</td>
      <td>/api/v1/recipes/:recipeId</td>
      <td>Delete a recipe</td>
  </tr>
  
  <tr>
      <td>PUT</td>
      <td>/api/v1/recipes/:recipeId<bookId></td>
      <td>Modify Recipe information</td>
  </tr>
  
  <tr>
      <td>GET</td>
      <td>/api/v1/recipes/</td>
      <td>Get all recipes</td>
  </tr>
   <tr>
      <td>GET</td>
      <td>/api/v1/recipes/?sort=upVote&order=desc</td>
      <td>Get all recipes</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/recipes/:recipeId/reviews </td>
      <td>Post a review</td>
  </tr>
</table>

