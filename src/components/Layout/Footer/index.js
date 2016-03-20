import React from "react";
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
        <footer>
          © { (new Date).getFullYear() }
        </footer>
    );
  }
}

