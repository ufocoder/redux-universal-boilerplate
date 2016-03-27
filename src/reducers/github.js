import {
  FETCH_TRENDS_SUCCESS,
  FETCH_TRENDS_FAILURE
} from '../constants/actions';


const initialState = {
  trends: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRENDS_SUCCESS:
      return {
        trends: action.trends
      };
    case FETCH_TRENDS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
};
