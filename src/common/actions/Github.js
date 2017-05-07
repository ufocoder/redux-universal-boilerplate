import {createActions} from 'redux-actions'

import {
  TRENDS_FETCH_REQUEST,
  TRENDS_FETCH_SUCCESS,
  TRENDS_FETCH_FAILURE,
  TRENDS_RESET,
} from 'src/common/constants/actions/Github';

export const {
  trendsFetchRequest,
  trendsFetchSuccess,
  trendsFetchFailure,
  trendsReset,
} = createActions({
  [TRENDS_FETCH_REQUEST]: () => ({}),
  [TRENDS_FETCH_SUCCESS]: (trends) => ({trends}),
  [TRENDS_FETCH_FAILURE]: () => ({}),
  [TRENDS_RESET]: () => ({}),
});

