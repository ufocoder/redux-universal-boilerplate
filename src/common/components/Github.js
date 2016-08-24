import React, {Component, PropTypes} from 'react';
import Helmet from "react-helmet";
import Error from './Error';

export default class GithubContainer extends Component {
  static propTypes = {
    trends: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string
  }

  render() {
    const {error, loading, trends} = this.props;

    if (error) {
      return (
        <Error title="Github error" message={error} />
      );
    }

    if (loading) {
      return (
        <div>loading..</div>
      );
    }

    return (
      <div className="ui relaxed divided list">
        <Helmet title="React Github trends" />

        <h1>React Github trends</h1>

        { trends.map(function(trend, key) {
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
