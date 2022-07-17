import Axios from 'axios';
import * as types from './../actionTypes/submitQuiz';

export const submitQuiz: any =
  (data: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch(setSubmitQuizLoading());
      var score: number = 0;
      const {
        response: { allResponses },
        question: { allQuestions },
        credentials: { userInfo },
      } = getState();
      allResponses.forEach((itm: any) => {
        allQuestions.forEach((itm2: any) => {
          if (itm.qId === itm2._id && itm.answer === itm2.answer) score++;
        });
      });
      Axios.post('/api/response', {
        name: userInfo.name,
        dob: userInfo.dob,
        fatherName: userInfo.fatherName,
        address: userInfo.address,
        docType: userInfo.docType,
        docNum: userInfo.docNum,
        email: userInfo.email,
        //   pic ,
        score,
        responses: allResponses,
      })
        .then((res: any) => {
          return dispatch({
            type: types.QUIZ_SUBMIT_SUCCESS,
            payload: {},
          });
        })
        .catch((error: any) => {
          console.log(error.response.data);
          return dispatch({
            type: types.QUIZ_SUBMIT_FAILED,
            payload: error,
          });
        });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: types.QUIZ_SUBMIT_FAILED,
        payload: error,
      });
    }
  };

export const setSubmitQuizLoading = () => {
  return {
    type: types.QUIZ_SUBMIT_LOADING,
  };
};
