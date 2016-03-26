import React from 'react';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import Layout from './containers/Layout';
import NotFound from './components/NotFound';
import {About, Home, Trends} from './components/Page';
import {Login, Logout, Profile} from './components/User';
import {logout} from './actions/Auth';

function authRequired(store) {
  return (nextState, replace) => {
    const state = store.getState();
    if (!state.auth.loggedIn) {
      replace('/login');
    }
  }
}

function authNoRequired(store) {
  return (nextState, replace) => {
    const state = store.getState();
    if (state.auth.loggedIn) {
      replace('/profile');
    }
  }
}

function authLogout(store) {
  return (nextState, replace) => {
    store.dispatch(logout());
    replace('/login');
  }
}

export default (store) => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="trends" component={Trends} />

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
}
