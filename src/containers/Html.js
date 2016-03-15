/* eslint max-len: [2, 120, 4] */
/* eslint react/no-danger: 0 */

import React, {PropTypes} from "react";
import {CONTAINER_ID} from '../constants/application';

export default class Html extends React.Component {
  static defaultProps = {
    title: 'Universal react boilerplate'
  }
  static propTypes = {
    lang: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    assets: PropTypes.object.isRequired,

    // meta tags, title, etc.
    title: PropTypes.string,
    description: PropTypes.string,
    siteName: PropTypes.string,
    currentUrl: PropTypes.string,
    images: PropTypes.array
  }
  render() {
    const {assets, state, content, lang} = this.props;
    const {title, description, siteName, currentUrl, images} = this.props;

    return (
      <html lang={ lang }>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
          <title>{ title }</title>
          <meta name="description" content={ description } />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={ siteName } />
          <meta property="og:title" content={ title } />
          <meta property="og:description" content={ description } />
          <meta property="og:url" content={ currentUrl } />

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
