import React, { Component } from 'react'
import { AppContainer } from 'react-hot-loader'
import { trigger } from 'redial'
import { Router, browserHistory, match } from 'react-router-dom'
import { ConnectedRouter, syncHistoryWithStore } from 'connected-react-router'
import { Provider } from 'react-redux'

import configureStore from 'src/common/store'
import routesContainer from 'src/common/routes'

const initialState = window.__INITIAL_STATE__
const store = configureStore(browserHistory, initialState)
const history = syncHistoryWithStore(browserHistory, store)
const routes = routesContainer(store)
const { dispatch } = store

history.listen((location) => {
  match({ routes, location, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error(error)
    }
    if (renderProps) {
      const { components } = renderProps
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        store,
        dispatch
      }

      if (window.__INITIAL_STATE__) {
        delete window.__INITIAL_STATE__
      } else {
        trigger('fetch', components, locals)
      }

      trigger('defer', components, locals)
    }
  })
})

export default class Root extends Component {
  render () {
    return (
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            {routes}
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    )
  }
}
