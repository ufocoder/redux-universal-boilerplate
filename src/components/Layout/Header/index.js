import React from "react";
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>Redux universal boilerplate</h1>
        </header>
        <menu>
          <Link to="/">homepage</Link>
          { " | "}
          <Link to="/about">about</Link>
        </menu>
      </div>
    );
  }
}

