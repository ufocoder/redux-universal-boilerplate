import React, {PropTypes} from "react";
import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/components/reset.css';
import 'semantic-ui-css/components/header.css';
import 'semantic-ui-css/components/container.css';
import 'semantic-ui-css/components/segment.css';
import 'semantic-ui-css/components/menu.css';
import 'semantic-ui-css/components/message.css';
import 'semantic-ui-css/components/form.css';
import 'semantic-ui-css/components/button.css';

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    return (
      <div>
        <Header />
        <div className="ui text main-container container">
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
