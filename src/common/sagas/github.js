import axios from 'axios';
import {call, put} from 'redux-saga/effects';

import {
  TRENDS_FETCH_SUCCESS,
  TRENDS_FETCH_FAILURE,
} from 'src/common/constants/actions/Github';

export function* fetchGithubData() {
  try {
    const url = 'https://api.github.com/search/repositories';
    const params = {
      q: 'react',
      sort: 'stars',
    };

    const {data: {items: trends}} = yield call(axios.get, url, {params});

    yield put({
      type: TRENDS_FETCH_SUCCESS,
      payload: {
        trends,
      },
    });
  } catch (error) {
    yield put({
      type: TRENDS_FETCH_FAILURE,
      error: true,
      payload: error,
    });
  }
}
