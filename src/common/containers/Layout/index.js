import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import Layout from 'src/common/components/Layout';

@connect(
  state => ({
    loggedIn: state.auth.loggedIn
  })
)
export default class LayoutContainer extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    loggedIn: PropTypes.bool
  }

  render() {
    return (
      <Layout {...this.props} />
    );
  }
}
