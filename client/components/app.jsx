import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavigationBar from './navigationBar';
import Footer from './footer';
import HomePage from './home/homePage';
import ReecipesPage from './recipes/recipePage';
import SignupPage from './signup/signupPage';
import SigninPage from './signin/signinPage';
import AddRecipePage from './secure/recipes/addRecipePage';
import UpdateRecipePage from './secure/recipes/updateRecipePage';
import RecipeDetails from './recipes/recipeDetails';
import Favorites from './recipes/favorites';
import UserRecipe from './recipes/userRecipe';
import User from './profile';


import notFound from './404';
import requireAuth from '../utils/requireAuth';
/**
 *
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @description Render
   * @param {any} props
   * @memberof Home
   * @return {void}
   */
  render() {
    return (
      <BrowserRouter>
        <div id="wrap">
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/signin" component={SigninPage} />

            <Route path="/add-recipe" component={requireAuth(AddRecipePage)} />
            <Route path="/recipes" component={ReecipesPage} />
            <Route path="/recipe-details/:recipeId" component={RecipeDetails} />
            <Route path="/edit-recipe/:recipeId" component={requireAuth(UpdateRecipePage)} />
            <Route path="/my-recipes" component={requireAuth(UserRecipe)} />
            <Route path="/profile" component={requireAuth(User)} />
            <Route path="/recipe-by/:userName/:userId" component={UserRecipe} />
            <Route path="/favorites" component={Favorites} />

            <Route component={notFound} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
