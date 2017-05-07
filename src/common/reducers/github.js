import {handleActions} from 'redux-actions';

import {
  TRENDS_RESET,
  TRENDS_FETCH_REQUEST,
  TRENDS_FETCH_SUCCESS,
  TRENDS_FETCH_FAILURE,
} from 'src/common/constants/actions/Github';

export const initialState = {
  trends: [],
  loading: false,
  error: null,
};

export default handleActions({
  [TRENDS_FETCH_REQUEST]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [TRENDS_FETCH_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    trends: action.payload.trends,
  }),
  [TRENDS_FETCH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [TRENDS_RESET]: (state, action) => ({
    ...initialState,
  }),
}, initialState);
