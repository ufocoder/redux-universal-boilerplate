import {logoutRequest} from 'src/common/actions/Auth';

/**
 * @param  {object} store Redux store
 * @return {function} onEnter callback helper for check authenticated user
 */
export function authRequired(store) {
  return (nextState, replace) => {
    const state = store.getState();
    if (!state.auth.loggedIn) {
      replace('/login');
    }
  };
}

/**
 * @param  {object} store Redux store
 * @return {function} onEnter callback helper for check not authenticated user
 */
export function authNoRequired(store) {
  return (nextState, replace) => {
    const state = store.getState();
    if (state.auth.loggedIn) {
      replace('/profile');
    }
  };
}

/**
 * @param  {object} store Redux store
 * @return {function} onEnter callback helper for user logout
 */
export function authLogout(store) {
  return (nextState, replace) => {
    store.dispatch(logoutRequest());
    replace('/login');
  };
}
