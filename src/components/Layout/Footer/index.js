import React from "react";
import {Link} from 'react-router';

export default class Header extends React.Component {
  render() {
    const date = new Date();
    return (
        <footer>
          © { date.getFullYear() }
        </footer>
    );
  }
}

