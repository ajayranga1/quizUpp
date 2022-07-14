import React, { useEffect } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import QuizSteps from './QuizSteps';
import Question from './Question';
import { getAllQuestions } from '../actions/question';

function Quiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  interface RootState {
    question: {
      allQuestions: [any];
    };
    response: {
      allResponses: [any];
    };
  }
  const { allQuestions } = useSelector((state: RootState) => state.question);
  const { allResponses } = useSelector((state: RootState) => state.response);

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
      <QuizSteps stepsNum={2} />
      <h2 className='my-4'>Welcome to the Quiz</h2>
      <ListGroup className='questionsList'>
        {allQuestions &&
          allQuestions.map((question: any, index: number) => (
            <Question
              questionData={question}
              index={index + 1}
              key={index}
              responses={allResponses}
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
    </Container>
  );
}

export default Quiz;
