import React, { useEffect } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import QuizSteps from './QuizSteps';
import Question from './Question';
import { getAllQuestions } from '../actions/question';
import Meta from './Meta';
import Loader from './Loader';
import Message from './Message';

function Quiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  interface RootState {
    credentials: {
      userInfo: any;
      loading: boolean;
      error: any;
    };
    question: {
      allQuestions: [any];
      loading: boolean;
      error: any;
    };
    response: {
      allResponses: [any];
      loading: boolean;
      error: any;
    };
  }

  const {
    userInfo,
    loading: userInfoLoading,
    error: userInfoError,
  } = useSelector((state: RootState) => state.credentials);

  const {
    allQuestions,
    loading: questionLoading,
    error: allQuestionsError,
  } = useSelector((state: RootState) => state.question);

  const {
    allResponses,
    loading: responseLoading,
    error: allResponseError,
  } = useSelector((state: RootState) => state.response);

  useEffect(() => {
    if (allQuestions.length < 1) {
      dispatch(getAllQuestions());
    }
  }, [allQuestions, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const goBack = () => {
    navigate('/step1');
  };

  const goForward = () => {
    navigate('/step3');
  };

  return (
    <Container>
      <Meta title={'Your Quiz'} />
      <QuizSteps stepsNum={2} />
      <h2 className='my-4'>Welcome to the Quiz</h2>
      {questionLoading || responseLoading ? (
        <Loader />
      ) : (
        <>
          {Object.keys(userInfoError).length > 0 && (
            <Message variant='danger'>{JSON.stringify(userInfoError)}</Message>
          )}
          {Object.keys(allQuestionsError).length > 0 && (
            <Message variant='danger'>
              {JSON.stringify(allQuestionsError)}
            </Message>
          )}
          {Object.keys(allResponseError).length > 0 && (
            <Message variant='danger'>
              {JSON.stringify(allResponseError)}
            </Message>
          )}
          <ListGroup className='questionsList'>
            {allQuestions &&
              allQuestions.map((question: any, index: number) => (
                <Question
                  questionData={question}
                  index={index + 1}
                  key={index}
                  responses={allResponses}
                  readOnly={false}
                />
              ))}
          </ListGroup>
          <Row>
            <Col>
              <Button
                variant='secondary'
                className='my-3 ms-3'
                onClick={() => goBack()}
              >
                Previous
              </Button>
            </Col>
            <Col xs={1}>
              <Button
                variant='primary'
                className='my-3'
                onClick={() => goForward()}
              >
                Next
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default Quiz;
