import axios from 'axios';
import {call, put} from 'redux-saga/effects';

import {
  trendsFetchSuccess,
  trendsFetchFailure,
} from 'src/common/actions/Github';

export function* fetchGithubData() {
  try {
    const url = 'https://api.github.com/search/repositories';
    const params = {
      q: 'react',
      sort: 'stars',
    };

    const {data: {items: trends}} = yield call(axios.get, url, {params});

    yield put(trendsFetchSuccess(trends));
  } catch (error) {
    yield put(trendsFetchFailure(error));
  }
}
