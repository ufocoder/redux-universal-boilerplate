import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from 'src/common/constants/actions/Auth';

const initialState = {
  user: null,
  loggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.result,
        loggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.error,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
