import * as types from './../actionTypes/credentials';

export const saveCredentials: any = (credentials: any) => (dispatch: any) => {
  dispatch(setSaveCredentialsLoading());
  try {
    dispatch({ type: types.CREDENTIALS_SAVE, payload: credentials });
  } catch (error) {
    return dispatch({ type: types.CREDENTIALS_SAVE_FAILED, payload: error });
  } finally {
    return dispatch({
      type: types.CREDENTIALS_SAVE_SUCCESS,
      payload: credentials,
    });
  }
};

export const setSaveCredentialsLoading = () => {
  return {
    type: types.CREDENTIALS_SAVE_LOADING,
  };
};
