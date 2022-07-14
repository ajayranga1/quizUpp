import * as types from './../actionTypes/responses';

export const submitResponse: any =
  (data: any) => async (dispatch: any, getState: any) => {
    try {
      dispatch(setSubmitAnswerLoading());
      var result: any = [];
      const {
        response: { allResponses },
      } = getState();
      allResponses.length !== 0
        ? allResponses.forEach((itm: any) => {
            if (itm.qId === data.qId)
              result.push({ qId: data.qId, answer: data.answer });
            else {
              result.push(itm, data);
            }
          })
        : result.push(data);

      result = result.filter(
        (itm: any, index: number, arr: [any]) =>
          arr.findIndex((itm2: any) => itm2.qId === itm.qId) === index
      );
      return dispatch({
        type: types.RESPONSE_SUBMIT,
        payload: result,
      });
    } catch (error) {
      console.log(error);
      return dispatch({
        type: types.RESPONSE_SUBMIT_FAILED,
        payload: error,
      });
    }
  };

// export const getQuestions: any = () => (dispatch: any, getState: any) => {
//   const {
//     question: { allQuestions },
//   } = getState();
//   const question = allQuestions.find((ans: any) => ans._id === data.qId);
// };
export const setSubmitAnswerLoading = () => {
  return {
    type: types.RESPONSE_SUBMIT_LOADING,
  };
};

//   state.allResponses.length !== 0
//     ? state.allResponses.map((res: any) =>
//         res.question._id !== action.payload.qId
//           ? action.payload
//           : {
//               question: action.payload.question,
//               response: action.payload.response,
//             }
//       )
//     : action.payload,
// ],

// if (allResponses.length !== 0) {
//   for (var i = 0; i < allResponses.length; i++) {
//     if (allResponses[i].qId === data.qId) {
//       result.push({ qId: data.qId, answer: data.answer });
//     } else result.push(data);rs
//   }
// } else result.push(data);
