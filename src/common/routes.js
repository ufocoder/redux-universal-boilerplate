import React from 'react'
import {Route, IndexRoute, Switch} from 'react-router-dom'
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
    <Switch>
      <Route exact path='/' component={Layout}>
        <Route path='/home' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/trends' component={Github} />

        <Route render={() => { return authNoRequired(store) }} >
          <Route path='/login' component={Login} />
        </Route>

        <Route render={() => { return authRequired(store) }} >
          <Route path='/profile' component={Profile} />
          <Route path='/logout' render={() => { return authLogout(store) }} />
        </Route>

        <Route path='*' name='not-found' component={NotFound} />
      </Route>
    </Switch>
  )
}

export default routes
