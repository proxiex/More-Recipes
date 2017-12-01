import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import setAuthorizationToken from './utils/setAuthorizationToken';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, logout } from './actions/signinActions';

import './assets/init';
import './assets/styles.scss';

import App from './components/app';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
 
);

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  const decToken = jwtDecode(localStorage.jwtToken);
  const dateNow = new Date().getTime() / 1000;
  console.log(decToken.exp, dateNow);

  if (decToken.exp < dateNow ) {
    store.dispatch(logout())
  } else {
    store.dispatch(setCurrentUser(decToken));
  }

 
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
); 