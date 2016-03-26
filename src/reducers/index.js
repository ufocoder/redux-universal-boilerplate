import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import authReducer from './auth';
import authGithub from './github';

export const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  github: authGithub
});

export default rootReducer;
