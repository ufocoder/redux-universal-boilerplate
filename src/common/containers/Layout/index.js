import React, {PropTypes} from "react";
import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/semantic.css';

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object
  }
  render() {
    return (
      <div>
        <div className="layout-container">
          <Header />
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
