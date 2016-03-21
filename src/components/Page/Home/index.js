import React from "react";
import logo from "./logo.png";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <p style={ {textAlign: 'center'} }><img src={ logo } /></p>
      </div>
    );
  }
}
