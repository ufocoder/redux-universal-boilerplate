import React from "react";
import logo from "./logo.png";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Home page</h2>
        <p><img src={ logo } /></p>
      </div>
    );
  }
}
