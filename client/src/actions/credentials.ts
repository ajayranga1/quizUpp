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

export const deleteCredentials: any = (credentials: any) => (dispatch: any) => {
  dispatch(setDeleteCredentialsLoading());
  try {
    dispatch({ type: types.CREDENTIALS_DELETE });
  } catch (error) {
    return dispatch({ type: types.CREDENTIALS_DELETE_FAILED, payload: error });
  } finally {
    return dispatch({
      type: types.CREDENTIALS_DELETE_SUCCESS,
    });
  }
};

export const setSaveCredentialsLoading = () => {
  return {
    type: types.CREDENTIALS_SAVE_LOADING,
  };
};
export const setDeleteCredentialsLoading = () => {
  return {
    type: types.CREDENTIALS_DELETE_LOADING,
  };
};
