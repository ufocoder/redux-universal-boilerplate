import React from 'react';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import Layout from './components/Layout';
import NotFound from './components/NotFound';
import About from './components/Page/About';
import Home from './components/Page/Home';

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
    </Route>
    <Route path="*" name="not-found" component={NotFound} />
  </Router>
);
