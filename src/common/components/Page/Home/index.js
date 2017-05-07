import React from 'react';
import Helmet from 'react-helmet';

import './assets/styles.styl';

const Home = () => (
  <div className="homepage">
    <Helmet title="Homepage" />
    <div className="homepage__space">
      <div className="homepage__space__title">
        Universal boilerplate
      </div>
      <div className="homepage__space__astronaut" />
    </div>
    <div className="homepage__ground" />
  </div>
);

export default Home;
