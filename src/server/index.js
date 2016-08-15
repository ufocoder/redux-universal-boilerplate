/* global webpackIsomorphicTools, __DEV__ */
/* eslint no-console: [2, { allow: ["log"] }] */

import BabelPolyFill from 'babel-polyfill';
import path from 'path';
import _ from 'lodash';
import locale from 'locale';
import Express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {createMemoryHistory, RouterContext, match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import configureStore from '../common/store.js';
import Html from './containers/Html';
import routesContainer from '../common/routes';

const supportedLocales = ["en", "en_US"];
const port = process.env.PORT || 8000;
const app = new Express();
const publicPath = path.resolve('static');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(locale(supportedLocales));
app.use(Express.static(publicPath));

let memoryHistory;
let store;
let history;
let routes;

app.use((req, res, next) => {
  const location = req.url;

  memoryHistory = createMemoryHistory(location);
  store = configureStore(memoryHistory);
  history = syncHistoryWithStore(memoryHistory, store);
  routes = routesContainer(store);

  match({
    routes,
    location: req.path
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (error || !renderProps) {
      next(error);
      return;
    }

    const assets = webpackIsomorphicTools.assets();
    const content = ReactDOM.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const state = 'window.__INITIAL_STATE__=' + JSON.stringify(store.getState()) + ';';

    const markup = <Html
      assets={assets}
      state={state}
      content={content} />;

    const doctype = '<!doctype html>';
    const html = ReactDOM.renderToStaticMarkup(markup);

    const isNotFound = _.find(renderProps.routes, {
      name: 'not-found'
    });

    res.status(isNotFound ? 404 : 200);
    res.send(doctype + html);
  });
});

if (__DEV__ && module.hot) {
  console.log('[HMR] Waiting for server-side updates');

  module.hot.accept('../common/routes', () => {
    let routesContainer = require('../common/routes').default;
    routes = routesContainer(store);
  });

  module.hot.addStatusHandler(status => {
    if (status === 'abort') {
      setTimeout(() => process.exit(0), 0);
    }
  });
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
