import React from "react";
import {Link} from 'react-router';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <p>Page not found</p>
        <p><Link to="/">Go home</Link></p>
      </div>
    );
  }
}
