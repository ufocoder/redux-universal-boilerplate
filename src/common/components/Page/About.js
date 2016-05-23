import React from "react";
import Helmet from "react-helmet";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="About" />
        <p>
          Boilerplate for react universal application building on
          flux architecture based on redux implementation.
        </p>
      </div>
    );
  }
}
