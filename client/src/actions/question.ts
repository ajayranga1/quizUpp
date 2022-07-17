import axios from 'axios';
import * as types from './../actionTypes/question';

export const getAllQuestions: any = () => (dispatch: any) => {
  dispatch(setQuestionLoading());
  axios
    .get('/api/question/')
    .then((res) =>
      dispatch({
        type: types.QUESTIONS_LOADING_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: types.QUESTIONS_LOADING_FAILED,
        payload: err.response.status,
      })
    );
};
export const setQuestionLoading = () => {
  return {
    type: types.QUESTIONS_LOADING,
  };
};
