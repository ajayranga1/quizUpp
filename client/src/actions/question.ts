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
// export const addItem = (item) => (dispatch, getState) => {
//   dispatch(setItemsLoading());
//   axios
//     .post(server, item, configToken(getState))
//     .then((res) => {
//       dispatch({
//         type: types.ADD_ITEM,
//         payload: res.data,
//       });
//     })
//     .catch((err) =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
// export const deleteItem = (id) => (dispatch, getState) => {
//   dispatch(setItemsLoading());
//   axios
//     .delete(server + id, configToken(getState))
//     .then((res) => {
//       dispatch({
//         type: types.DELETE_ITEM,
//         payload: id,
//       });
//     })
//     .catch((err) =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
export const setQuestionLoading = () => {
  return {
    type: types.QUESTIONS_LOADING,
  };
};
