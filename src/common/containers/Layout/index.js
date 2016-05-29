import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/semantic.css';

@connect(
  state => ({
    loggedIn: state.auth.loggedIn
  })
)
export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool
  }

  render() {
    return (
      <div>
        <div className="layout-container">
          <Header loggedIn={this.props.loggedIn} />
          <div className="ui text container">
            <div className="ui segment">
              { this.props.children }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
