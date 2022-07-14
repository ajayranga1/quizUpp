import { combineReducers } from 'redux';
import questionReducer from './questionReducer';
import responseReducer from './responseReducer';
import credentialsReducer from './credentialsReducer';

export default combineReducers({
  question: questionReducer,
  response: responseReducer,
  credentials: credentialsReducer,
});
