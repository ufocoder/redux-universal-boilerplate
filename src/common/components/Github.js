import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Error from './Error'

const Github = (props) => {
  const {error, loading, trends} = props

  if (error) {
    return (
      <Error title="Github error" message={error} />
    )
  }

  if (loading) {
    return (
      <div>loading..</div>
    )
  }

  return (
    <div className="ui relaxed divided list">
      <Helmet title="React Github trends" />

      <h1>React Github trends</h1>

      {trends.map(function (trend, key) {
        return (
          <div className="item" key={key}>
            <i className="large github middle aligned icon" />
            <div className="content">
              <a className="header">{trend.full_name}</a>
              <div className="description">{trend.stargazers_count}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

Github.propTypes = {
  trends: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string
}

export default Github
