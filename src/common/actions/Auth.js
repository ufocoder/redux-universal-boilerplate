import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from 'src/common/constants/actions/Auth';

export function login(username, password) {
  return {
    type: LOGIN_REQUEST,
    payload: {
      username,
      password,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT_REQUEST,
  };
}
