import {takeEvery} from 'redux-saga/effects';

import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
} from 'src/common/constants/actions/Auth';

import {TRENDS_FETCH_REQUEST} from 'src/common/constants/actions/Github';

import {fetchLogin, fetchLogout} from './auth';
import {fetchGithubData} from './github';

function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, fetchLogin);
  yield takeEvery(LOGOUT_REQUEST, fetchLogout);
  yield takeEvery(TRENDS_FETCH_REQUEST, fetchGithubData);
}

export default rootSaga;
