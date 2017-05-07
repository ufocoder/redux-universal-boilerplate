import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Layout from 'src/common/components/Layout';

@connect(
  (state) => ({
    loggedIn: state.auth.loggedIn,
  })
)
export default class LayoutContainer extends Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool,
  }

  render() {
    return (
      <Layout {...this.props} />
    );
  }
}
