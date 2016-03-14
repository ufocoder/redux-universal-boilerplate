import React from "react";
import {BASE_URL} from "../constants/application";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <p><img src={ BASE_URL + "logo.png"} /></p>
      </div>
    );
  }
}
