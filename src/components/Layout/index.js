import React, {PropTypes} from "react";
import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/semantic.css';

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
