/* eslint react/no-danger: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import {CONTAINER_ID} from 'src/common/constants/application';

export default class Html extends React.Component {

  static propTypes = {
    assets: PropTypes.object.isRequired,
    content: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
  }

  render() {
    const {assets, store, content} = this.props;

    const helmet = Helmet.rewind();
    const attrs = helmet.htmlAttributes.toComponent();

    return (
      <html {...attrs}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}

          {Object.keys(assets.styles).map((style, i) =>
            <link href={assets.styles[style]} key={i} media="screen, projection" rel="stylesheet" type="text/css"/>
          )}
        </head>

        <body>
          <div id={ CONTAINER_ID } dangerouslySetInnerHTML={ {__html: content} } />
          <script dangerouslySetInnerHTML={{
            __html: 'window.__INITIAL_STATE__=' + serialize(store.getState()) + ';',
          }} />
          {Object.keys(assets.javascript).map((script, i) =>
            <script src={assets.javascript[script]} key={i}/>
          )}
        </body>
      </html>
    );
  }
}
