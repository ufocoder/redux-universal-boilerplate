import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import auth from './auth';
import github from './github';

export const rootReducer = combineReducers({
  routing,
  auth,
  github,
});

export default rootReducer;
