import React from "react";
import {Link} from 'react-router';
import Helmet from "react-helmet";

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Page not found" />

        <h1>404</h1>
        <p>Page not found</p>
        <div className="ui info message">
          This page will return 404 HTTP status
          if you directly open it in your browser
        </div>
        <p><Link to="/">Go home</Link></p>
      </div>
    );
  }
}
