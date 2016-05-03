import React from 'react';
import logo from './logo.png';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <p style={{textAlign: 'center', margin: '50px'}}>
          <img style={{maxWidth: '256px'}} src={logo} />
        </p>
      </div>
    );
  }
}
