/* global webpackIsomorphicTools, __PRODUCTION__ */
/* eslint no-console: [2, { allow: ["log"] }] */

import {trigger} from 'redial';
import path from 'path';
import _ from 'lodash';
import locale from 'locale';
import Express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import {AppContainer} from 'react-hot-loader';
import ReactDOM from 'react-dom/server';
import {createMemoryHistory, RouterContext, match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import configureStore from 'src/common/store.js';
import routesContainer from 'src/common/routes';
import Html from './containers/Html';

const supportedLocales = ['en', 'en_US'];
const port = process.env.PORT || 8000;
const app = new Express();
const publicPath = path.resolve('static');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(locale(supportedLocales));
app.use(Express.static(publicPath));

let routes;
let store;

app.use((req, res, next) => {
  const location = req.url;

  const memoryHistory = createMemoryHistory(location);

  store = configureStore(memoryHistory);
  routes = routesContainer(store);

  const history = syncHistoryWithStore(memoryHistory, store);

  match({
    history,
    routes,
    location: req.path,
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (error || !renderProps) {
      next(error);
      return;
    }

    const {components} = renderProps;
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,
      dispatch: store.dispatch,
    };

    trigger('fetch', components, locals)
      .then(() => {
        try {
          const assets = webpackIsomorphicTools.assets();
          const content = ReactDOM.renderToString(
            <AppContainer>
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            </AppContainer>
          );

          const markup = <Html
            assets={assets}
            store={store}
            content={content} />;

          const doctype = '<!doctype html>';
          const html = ReactDOM.renderToStaticMarkup(markup);

          const isNotFound = _.find(renderProps.routes, {
            name: 'not-found',
          });

          res.status(isNotFound ? 404 : 200);
          res.send(doctype + html);
        } catch (err) {
          res.status(503);
        }
      })
      .catch(() => {
        res.status(503);
      });
  });
});

if (!__PRODUCTION__ && module.hot) {
  console.log('[HMR] Waiting for server-side updates');

  module.hot.addStatusHandler((status) => {
    if (status === 'abort') {
      setTimeout(() => process.exit(0), 0);
    }
  });
}

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
