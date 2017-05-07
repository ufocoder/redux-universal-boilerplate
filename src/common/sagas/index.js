import {takeEvery} from 'redux-saga/effects';

import {LOGIN_REQUEST} from 'src/common/constants/actions/Auth';
import {TRENDS_FETCH_REQUEST} from 'src/common/constants/actions/Github';

import {fetchAuthData} from './auth';
import {fetchGithubData} from './github';

function* rootSaga() {
  yield takeEvery(LOGIN_REQUEST, fetchAuthData);
  yield takeEvery(TRENDS_FETCH_REQUEST, fetchGithubData);
}

export default rootSaga;
