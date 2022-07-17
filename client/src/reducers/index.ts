import { combineReducers } from 'redux';
import questionReducer from './questionReducer';
import responseReducer from './responseReducer';
import credentialsReducer from './credentialsReducer';
import submitQuizReducer from './submitQuizReducer';

export default combineReducers({
  question: questionReducer,
  response: responseReducer,
  credentials: credentialsReducer,
  submitQuiz: submitQuizReducer,
});
