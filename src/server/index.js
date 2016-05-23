/* global webpackIsomorphicTools, __DEV__ */
/* eslint no-console: [2, { allow: ["log"] }] */

import BabelPolyFill from 'babel-polyfill';
import path from 'path';
import _ from 'lodash';
import locale from 'locale';
import Express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {RouterContext, match} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from '../common/store.js';
import Html from './containers/Html';
import routesContainer from '../common/routes';

const store = configureStore();
const initialState = store.getState();

const supportedLocales = ["en", "en_US"];
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8000;
const app = new Express();
const publicPath = path.resolve('static');

let routes = routesContainer(store);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(locale(supportedLocales));
app.use(cookieParser());
app.use(Express.static(publicPath));

app.use((req, res, next) => {
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
    const state = 'window.__INITIAL_STATE__=' + JSON.stringify(initialState) + ';';
    const content = ReactDOM.renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

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

app.listen(port, hostname);
