import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import './assets/init';
import './assets/style.css';

import App from './components/app';

const store = createStore(
  (state = {}) => state,
    applyMiddleware(thunk)
);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('app')
); 