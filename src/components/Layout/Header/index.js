import React from "react";
import {IndexLink, Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <div className="ui text container" style={{  marginTop: '50px' }}>
        <h1 className="ui dividing header">Redux universal boilerplate</h1>
        <div className="ui secondary pointing menu">
          <IndexLink to="/" className="item" activeClassName="active">Homepage</IndexLink>
          <Link to="/trends" className="item" activeClassName="active">Github trends</Link>
          <Link to="/about" className="item" activeClassName="active">About</Link>
        </div>
      </div>
    );
  }
}

