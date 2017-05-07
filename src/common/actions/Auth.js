import {createActions} from 'redux-actions'

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from 'src/common/constants/actions/Auth';

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} = createActions({
  [LOGIN_REQUEST]: (username, password) => ({username, password}),
  [LOGIN_SUCCESS]: (data) => (data),
  [LOGIN_FAILURE]: () => ({}),
  [LOGOUT_REQUEST]: () => ({}),
  [LOGOUT_SUCCESS]: () => ({}),
  [LOGOUT_FAILURE]: () => ({}),
});
