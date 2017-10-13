import React from 'react';
import { render } from 'react-dom';
import {Router, browserHistory } from 'react-router';
import './assets/init';
import './assets/style.css';
// import './assets/imgs/bg.jpg';
import routes from './routes';

render(<Router history={ browserHistory } routes={ routes } />, document.getElementById('app')); 