import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import QuizSteps from './QuizSteps';
import Question from './Question';
import Meta from './Meta';
import Loader from './Loader';
import Message from './Message';
import { submitQuiz } from '../actions/quizSubmit';

function Preview() {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => {
    setShow(true);
  };

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
    submitQuiz: {
      success: boolean;
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
  const {
    success,
    loading: submitQuizLoading,
    error: submitQuizError,
  } = useSelector((state: RootState) => state.submitQuiz);

  const goBack = () => {
    navigate('/step2');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const submitQuizHandler = () => {
    dispatch(submitQuiz());
    closeModal();
  };
  return (
    <Container>
      <Meta title={'Preview Quiz'} />
      <QuizSteps stepsNum={3} />
      <h2 className='my-4'>Here are your Responses</h2>
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
          {Object.keys(submitQuizError).length > 0 && (
            <Message variant='danger'>
              {JSON.stringify(submitQuizError)}
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
                  readOnly={true}
                />
              ))}
          </ListGroup>
          <Row>
            <Col>
              <Button
                variant='secondary'
                type='submit'
                className='my-3 ms-3'
                onClick={() => goBack()}
              >
                Previous
              </Button>
            </Col>
            <Col xs={2}>
              <Button
                variant='primary'
                type='submit'
                className='my-3'
                onClick={() => showModal()}
              >
                Submit Quiz
              </Button>
            </Col>
          </Row>
          <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Submit Your Quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure, You want to submit your Quiz</Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={closeModal}>
                Close
              </Button>
              <Button variant='primary' onClick={submitQuizHandler}>
                Submit Quiz
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Preview;
