/* global window, __PRODUCTION__ */
/* eslint no-console: [2, { allow: ["error"] }] */

import React from 'react';
import ReactDOM from 'react-dom';
import {CONTAINER_ID} from 'src/common/constants/application';
import Root from './Root';

const reactRoot = window.document.getElementById(CONTAINER_ID);

ReactDOM.render(<Root />, reactRoot);

if (!__PRODUCTION__ && module.hot) {
  module.hot.accept(() => {
    ReactDOM.render(<Root />, reactRoot);
  });
}

if (__PRODUCTION__) {
  if (!reactRoot.firstChild ||
      !reactRoot.firstChild.attributes ||
      !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error(
      'Server-side React render was discarded. Make sure that ' +
      'your initial render does not contain any client-side code.'
    );
  }
}
