import React from 'react';
import logoSrc from './logo.png';
import './styles.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className="logo">
          <img src={logoSrc} className="logo__image" />
      </div>
    );
  }
}
