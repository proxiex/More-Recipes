import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import HomePage from './components/home/homePage';
import ReecipesPage from './components/recipes/recipePage';
import SignupPage from './components/signup/signupPage';
import SigninPage from './components/signin/signinPage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path="/recipes" component={ReecipesPage} />    
    <Route path="/signup" component={SignupPage} />    
    <Route path="/signin" component={SigninPage} />    
  </Route>
)