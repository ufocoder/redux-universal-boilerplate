import React, {PropTypes} from "react";
import {Link} from 'react-router';

export default class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    return (
      <div>
        <h1>Universal react boilerplate</h1>

        <menu>
          <Link to="/">homepage</Link>
          { " | "}
          <Link to="/about">about</Link>
        </menu>

        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}
