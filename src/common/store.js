/* global window, __DEV__, __CLIENT__ */

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from './reducers';

/**
 * Return store
 *
 * @param {object} history History
 * @param {object} initialState Initial state for store
 * @return {object} Returns store with state
 */
export default function(history, initialState = {}) {
  let finalCreateStore;

  if (__DEV__ && __CLIENT__) {
    finalCreateStore = compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history)),
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ?
             window.devToolsExtension() : f => f
    )(createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(thunk),
      applyMiddleware(routerMiddleware(history))
    )(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
