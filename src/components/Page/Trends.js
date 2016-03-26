import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
  state => ({
    trends: state.github.trends
  })
)
export default class Trends extends Component {
  static propTypes = {
    trends: PropTypes.array,
  }
  render() {
    return (
      <div className="ui relaxed divided list">
        {
          this.props.trends.map(function(trend, i) {
            return (
              <div className="item" key={i}>
                <i className="large github middle aligned icon"></i>
                <div className="content">
                  <a className="header">{trend.full_name}</a>
                  <div className="description">stars: {trend.stargazers_count}</div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
