import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import authReducer from './auth';
import githubReducer from './github';

export const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  github: githubReducer
});

export default rootReducer;
