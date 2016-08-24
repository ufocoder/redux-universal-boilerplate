/* global window, __PRODUCTION__ */
/* eslint no-console: [2, { allow: ["error"] }] */

import BabelPolyFill from 'babel-polyfill';
import {trigger} from 'redial';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, match} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from '../common/store.js';
import routesContainer from '../common/routes';
import {CONTAINER_ID} from '../common/constants/application';

const store = configureStore(browserHistory, window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);
const reactRoot = window.document.getElementById(CONTAINER_ID);

let routes = routesContainer(store);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  reactRoot
);

history.listen(location => {
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      const { components } = renderProps;
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch: store.dispatch
      };

      if (window.__INITIAL_STATE__) {
        delete window.__INITIAL_STATE__;
      } else {
        trigger('fetch', components, locals);
      }

      trigger('defer', components, locals);
    }
  });
});

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
