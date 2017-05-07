import {put} from 'redux-saga/effects';

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} from 'src/common/actions/Auth';

import {
  TEST_USERNAME,
  TEST_PASSWORD,
  USER_FIXTURE,
} from 'src/common/constants/application';

export function* fetchLogin(action) {
  try {
    const {payload: {username, password}} = action;
    const validCredentials = username !== TEST_USERNAME && password !== TEST_PASSWORD;

    if (validCredentials) {
      throw new Error('Bad credentials');
    } else {
      yield put(loginSuccess(USER_FIXTURE));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

export function* fetchLogout() {
  try {
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
  }
}
