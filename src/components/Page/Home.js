import React from "react";
import {BASE_URL} from "../../constants/application";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Home page</h2>
        <p><img src={ BASE_URL + "logo.png"} /></p>
      </div>
    );
  }
}
