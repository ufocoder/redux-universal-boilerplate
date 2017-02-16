import React from 'react';
import Helmet from 'react-helmet';
import './assets/styles.styl';

export default class Home extends React.Component {
  render() {
    return (
      <div className="homepage">
          <Helmet title="Homepage" />
          <div className="homepage__space">
            <div className="homepage__space__title">
              Universal boilerplate
            </div>
            <div className="homepage__space__astronaut"></div>
          </div>
          <div className="homepage__ground"></div>
      </div>
    );
  }
}
