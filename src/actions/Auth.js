import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../constants/actions/Auth';

const fakeUser = {
  username: 'demo',
  token: 'ojn2jr3wrefj'
};

export function login(username, password) {
  return async (dispatch) => {
    try {

      if (username !== 'demo' && password !== 'demo') {
        throw new Error('Bad credentials');
      }

      dispatch({
        type: LOGIN_SUCCESS,
        result: fakeUser
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        error: error.message
      });
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_SUCCESS
      });
    } catch (error) {
      dispatch({
        type: LOGOUT_FAILURE,
        error: error.message
      });
    }
  };
}
