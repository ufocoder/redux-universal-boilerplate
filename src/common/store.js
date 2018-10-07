/* global window, __DEV__, __CLIENT__ */

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import rootReducer from './reducers'

/**
 * Return store
 *
 * @param {object} history History
 * @param {object} initialState Initial state for store
 * @return {object} Returns store with state
 */

export default function (history, initialState = {}) {

  let finalCreateStore;

  const middlleware = [thunk, routerMiddleware(history)];

  if (__DEV__ && __CLIENT__) {
    finalCreateStore = createStore(
      connectRouter(browserHistory)(rootReducer),
      applyMiddleware(...middleware),
    );
  } else {
    finalCreateStore = createStore(
      connectRouter(browserHistory)(rootReducer),
      compose(
        applyMiddleware(...middleware),
        typeof window === 'object' &&
        typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
      ),
    );
  }

  const store = finalCreateStore(rootReducer, initialState)

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store;

}
