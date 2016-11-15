import {
  RESET_TRENDS,
  FETCH_TRENDS_LOADING,
  FETCH_TRENDS_SUCCESS,
  FETCH_TRENDS_FAILURE,
} from 'src/common/constants/actions/Github';

import axios from 'axios';

const URL = 'https://api.github.com/search/repositories' +
            '?q=react' +
            '&created:>2016-01-01' +
            '&sort=stars';

/**
 * @return {function} Fetch trends async action
 */
export function fetchTrends() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_TRENDS_LOADING,
      });

      const response = await axios.get(URL);

      dispatch({
        type: FETCH_TRENDS_SUCCESS,
        trends: response.data.items,
      });
    } catch (error) {
      dispatch({
        type: FETCH_TRENDS_FAILURE,
        error: error.message || 'Unknown error occured',
      });
    }
  };
}

/**
 * @return {function} Reset trends action
 */
export function resetTrends() {
  return {
    type: RESET_TRENDS,
  };
}
