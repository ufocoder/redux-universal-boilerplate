import React from 'react';
import './assets/styles.css';

export default class Home extends React.Component {
  render() {
    return (
      <div className="homepage">
          <div className="homepage__space">
            <div className="homepage__space__title">
              Universal biolerplate
            </div>
            <div className="homepage__space__astronaut"></div>
          </div>
          <div className="homepage__ground"></div>
      </div>
    );
  }
}
