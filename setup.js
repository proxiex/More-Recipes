// This file is written in ES5 since it's not transpiled by Babel.
// This file does the following:
// 1. Registers babel for transpiling our code for testing
// 2. Disables Webpack-specific features that Mocha doesn't understand.
// 3. Requires jsdom so we can test via an in-memory DOM in Node
// 4. Sets up global vars that mimic a browser.

/* eslint-disable no-var */

/* This setting assures the .babelrc dev config (which includes
 hot module reloading code) doesn't apply for tests.
 But also, we don't want to set it to production here for
 two reasons:
 1. You won't see any PropType validation warnings when
 code is running in prod mode.
 2. Tests will not display detailed error messages
 when running against production version code
 */
process.env.NODE_ENV = 'test';

// Register babel so that it will transpile ES6 to ES5
// before our tests run.
require('babel-register')();

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = function () { return null; };
require.extensions['.png'] = function () { return null; };
require.extensions['.jpg'] = function () { return null; };

const Hammer = require('materialize-css/js/hammer.min');
const { JSDOM } = require('jsdom');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

const localStorageMock = require('./client/tests/__mocks__/localStorageMock');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}


global.window = window;
global.navigator = global.window.navigator;
global.Hammer = Hammer;
global.$ = require('jquery');

global.localStorage = localStorageMock;


global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
