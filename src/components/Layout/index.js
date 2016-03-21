import React, {PropTypes} from "react";
import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/components/reset.css';
import 'semantic-ui-css/components/container.css';

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}
