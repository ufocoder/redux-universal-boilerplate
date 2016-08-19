import React, {PropTypes} from "react";
import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/semantic.css';

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool
  }

  render() {
    const {children, loggedIn} = this.props;

    return (
      <div>
        <div className="layout-container">
          <Header loggedIn={loggedIn} />
          <div className="ui text container">
            <div className="ui segment">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
