import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/semantic.css';

const Layout = (props) => (
  <div>
    <div className="layout-container">
      <Header loggedIn={props.loggedIn} />
      <div className="ui text container">
        <div className="ui segment">
          {props.children}
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.object,
  loggedIn: PropTypes.bool,
};

export default Layout;
