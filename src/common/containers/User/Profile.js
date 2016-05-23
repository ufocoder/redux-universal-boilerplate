import React, {Component, PropTypes} from 'react';
import Helmet from "react-helmet";
import {connect} from 'react-redux';

@connect(
  state => ({
    user: state.auth.user
  })
)
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    return (
      <div>
        <Helmet title="Profile" />

        Welcome, {this.props.user.username}!
      </div>
    );
  }
}
