import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {provideHooks} from 'redial'
import {connect} from 'react-redux'
import {fetchTrends, resetTrends} from 'src/common/actions/Github'
import Github from 'src/common/components/Github'

@provideHooks({
  fetch: ({dispatch}) => {
    dispatch(resetTrends())
    return dispatch(fetchTrends())
  }
})
@connect(
  (state) => ({
    trends: state.github.trends,
    loading: state.github.loading,
    error: state.github.error
  })
)
export default class GithubContainer extends Component {
  static propTypes = {
    trends: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string
  }

  render () {
    return (
      <Github {...this.props} />
    )
  }
}
