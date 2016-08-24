import React from 'react';
import _ from 'lodash';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import Layout from './containers/Layout';
import NotFound from './components/NotFound';
import {About, Home} from './components/Page';
import {Login, Profile} from './containers/User';
import Github from './containers/Github';
import {
  authRequired,
  authNoRequired,
  authLogout
} from './helpers/routes';

import {initialState as trendsInitialState} from './reducers/github';

const routes = store => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="trends" component={Github} />

        <Route onEnter={authNoRequired(store)}>
          <Route path="login" component={Login} />
        </Route>

        <Route onEnter={authRequired(store)}>
          <Route path="profile" component={Profile} />
          <Route path="logout" onEnter={authLogout(store)} />
        </Route>

        <Route path="*" name="not-found" component={NotFound} />
      </Route>
    </Router>
  );
};

export default routes;
