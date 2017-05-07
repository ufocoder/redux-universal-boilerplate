import {handleActions} from 'redux-actions';

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

export default handleActions({
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload,
    loggedIn: true,
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    user: null,
    error: action.payload,
  }),
  [LOGOUT_SUCCESS]: (state, action) => ({
    ...state,
    loggedIn: false,
    user: null,
  }),
  [LOGOUT_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
}, initialState);
