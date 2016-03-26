import {logout} from '../actions/Auth';
import {fetchTrends as actionFetchTrends} from '../actions/Github';

export function authRequired(store) {
  return (nextState, replace) => {
    const state = store.getState();
    if (!state.auth.loggedIn) {
      replace('/login');
    }
  }
}

export function authNoRequired(store) {
  return (nextState, replace) => {
    const state = store.getState();
    if (state.auth.loggedIn) {
      replace('/profile');
    }
  }
}

export function authLogout(store) {
  return (nextState, replace) => {
    store.dispatch(logout());
    replace('/login');
  }
}

export function fetchTrends(store) {
  return (nextState, replace, callback) => {
    store.dispatch(actionFetchTrends());
    callback()
  }
}
