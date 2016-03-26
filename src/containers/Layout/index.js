import React, {PropTypes} from "react";
import Header from './Header';
import Footer from './Footer';

import 'semantic-ui-css/semantic.css';
import './style.css'

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="ui text container">
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}
