/* eslint react/no-danger: 0 */

import React, {PropTypes} from "react";
import Helmet from "react-helmet";
import {CONTAINER_ID} from '../../../common/constants/application';

export default class Html extends React.Component {

  static propTypes = {
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    assets: PropTypes.object.isRequired
  }

  render() {
    const {assets, state, content} = this.props;

    let helmet = Helmet.rewind();
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
          <script dangerouslySetInnerHTML={ {__html: state} } />
          {Object.keys(assets.javascript).map((script, i) =>
            <script src={assets.javascript[script]} key={i}/>
          )}
        </body>
      </html>
    );
  }
}
