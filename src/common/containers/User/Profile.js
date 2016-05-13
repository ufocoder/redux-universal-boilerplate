import React, {Component, PropTypes} from 'react';
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
        Welcome, {this.props.user.username}!
      </div>
    );
  }
}
