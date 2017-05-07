/* global window, __DEV__, __CLIENT__ */

import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';


/**
 * Return store
 *
 * @param {object} history History
 * @param {object} initialState Initial state for store
 * @return {object} Returns store with state
 */
export default function(history, initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  let finalCreateStore;

  if (__DEV__ && __CLIENT__) {
    finalCreateStore = compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history)),
      typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ?
             window.devToolsExtension() : (f) => f
    )(createStore);
  } else {
    finalCreateStore = compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(routerMiddleware(history))
    )(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  sagaMiddleware.run(rootSaga);

  if (__DEV__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
