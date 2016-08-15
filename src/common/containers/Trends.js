import React, {Component, PropTypes} from 'react';
import Helmet from "react-helmet";
import {connect} from 'react-redux';
import {fetchTrends} from '../actions/Github';
import Error from '../components/Error';

@connect(
  state => ({
    trends: state.github.trends,
    error: state.github.error
  })
)
export default class Trends extends Component {
  static propTypes = {
    trends: PropTypes.array,
    error: PropTypes.string
  }

  render() {
    if (this.props.error) {
      return (
        <Error title="Github error" message={this.props.error} />
      );
    }

    return (
      <div className="ui relaxed divided list">
        <Helmet title="React Github trends" />

        <h1>React Github trends</h1>

        { this.props.trends.map(function(trend, key) {
          return (
            <div className="item" key={key}>
              <i className="large github middle aligned icon"></i>
              <div className="content">
                <a className="header">{trend.full_name}</a>
                <div className="description">{trend.stargazers_count}</div>
              </div>
            </div>
          );
        }) }
      </div>
    );
  }
}
