import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './navigationBar';
import Footer from './footer';
import HomePage from './home/homePage';
import ReecipesPage from './recipes/recipePage';
import SignupPage from './signup/signupPage';
import SigninPage from './signin/signinPage';
import AddRecipePage from './secure/recipes/addRecipePage';


import notFound from './404';
import requireAuth from '../utils/requireAuth';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="wrap">
          <NavigationBar />
            <Switch>
              <Route path="/" exact component={HomePage} /> 
              <Route path="/recipes" component={ReecipesPage} />    
              <Route path="/signup" component={SignupPage} />    
              <Route path="/signin" component={SigninPage} /> 

              <Route path="/add-recipe" component={requireAuth(AddRecipePage)} />
              
              <Route component={notFound} />
            </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;