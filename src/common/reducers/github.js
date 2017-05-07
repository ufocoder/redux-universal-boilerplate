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

export default (state = initialState, action) => {
  switch (action.type) {
    case TRENDS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TRENDS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        trends: action.payload.trends,
      };
    case TRENDS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TRENDS_RESET:
      return initialState;
    default:
      return state;
  }
};
