import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Error extends Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string
  }
  render() {
    return (
      <div className="ui negative message">
        { this.props.title ?
          (
            <div className="header">
              { this.props.title }
            </div>
          ) : null
        }
        { this.props.message ?
          (
            <p>{this.props.message}</p>
          ) : null
        }
      </div>
    );
  }
}
