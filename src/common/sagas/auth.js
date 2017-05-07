import {put} from 'redux-saga/effects';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from 'src/common/constants/actions/Auth';

import {
  TEST_USERNAME,
  TEST_PASSWORD,
  USER_FIXTURE,
} from 'src/common/constants/application';

export function* fetchAuthData(action) {
  try {
    const {payload: {username, password}} = action;
    const validCredentials = username !== TEST_USERNAME && password !== TEST_PASSWORD;

    if (validCredentials) {
      throw new Error('Bad credentials');
    }

    yield put({
      type: LOGIN_SUCCESS,
      payload: USER_FIXTURE,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error: true,
      payload: error,
    });
  }
}
