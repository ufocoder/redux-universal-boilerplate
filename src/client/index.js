/* global window, __PRODUCTION__ */
/* eslint no-console: [2, { allow: ["error"] }] */

import BabelPolyFill from 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from '../common/store.js';
import routesContainer from '../common/routes';
import {CONTAINER_ID} from '../common/constants/application';

const store = configureStore(browserHistory, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);
const reactRoot = window.document.getElementById(CONTAINER_ID);

let routes = routesContainer(store);

delete window.__INITIAL_STATE__;

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  reactRoot
);

if (__PRODUCTION__) {
  if (!reactRoot.firstChild ||
      !reactRoot.firstChild.attributes ||
      !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error(
      'Server-side React render was discarded. Make sure that ' +
      'your initial render does not contain any client-side code.'
    );
  }
}
