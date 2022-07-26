import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCredentials } from '../actions/credentials';
import { deleteResponses } from '../actions/responses';
import { submitQuizClear } from '../actions/quizSubmit';
import { uploadImageClear } from '../actions/uploadImage';

function Checking() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  interface RootState {
    credentials: {
      userInfo: any;
    };
    submitQuiz: {
      success: Boolean;
    };
    uploadImage: {
      success: Boolean;
    };
  }

  const { userInfo } = useSelector((state: RootState) => state.credentials);
  const { success: submitQuizSuccess } = useSelector(
    (state: RootState) => state.submitQuiz
  );

  // useEffect(() => {
  //   if (userInfo && userInfo !== 'null' && userInfo !== 'undefined') {
  //     navigate('/step1', { replace: true });
  //   }
  // }, []);

  useEffect(() => {
    if (submitQuizSuccess === true) {
      setTimeout(() => {
        dispatch(deleteCredentials());
        dispatch(deleteResponses());
        dispatch(uploadImageClear());
        dispatch(submitQuizClear());
        navigate('/step1');
      }, 4000);
    }
  }, [submitQuizSuccess, dispatch]);

  return <></>;
}

export default Checking;
