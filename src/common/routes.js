import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './containers/Layout'
import NotFound from './components/NotFound'
import About from './components/Page/About'
import Home from './components/Page/Home'
import Login from './containers/User/Login'
import Profile from './containers/User/Profile'
import Github from './containers/Github'
import {
  authRequired,
  authNoRequired,
  authLogout
} from './helpers/routes'

const routes = (store) => {
  return (
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='about' component={About} />
      <Route path='trends' component={Github} />

      <Route onEnter={authNoRequired(store)}>
        <Route path='login' component={Login} />
      </Route>

      <Route onEnter={authRequired(store)}>
        <Route path='profile' component={Profile} />
        <Route path='logout' onEnter={authLogout(store)} />
      </Route>

      <Route path='*' name='not-found' component={NotFound} />
    </Route>
  )
}

export default routes
