import {
  FETCH_TRENDS_LOADING,
  FETCH_TRENDS_SUCCESS,
  FETCH_TRENDS_FAILURE
} from '../constants/actions/Github';

export const initialState = {
  trends: [],
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRENDS_LOADING:
      return {
        ...state,
        loading: true
      };
    case FETCH_TRENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        trends: action.trends
      };
    case FETCH_TRENDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
