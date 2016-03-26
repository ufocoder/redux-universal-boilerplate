import {
  FETCH_TRENDS_SUCCESS
} from '../constants/actions';


const initialState = {
  trends: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRENDS_SUCCESS:
      return {
        trends: action.trends
      };
    default:
      return state;
  }
};
