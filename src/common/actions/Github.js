import {
  TRENDS_FETCH_REQUEST,
  TRENDS_RESET,
} from 'src/common/constants/actions/Github';

export function fetchTrends() {
  return {
    type: TRENDS_FETCH_REQUEST,
  };
}

export function resetTrends() {
  return {
    type: TRENDS_RESET,
  };
}
