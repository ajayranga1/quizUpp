import React, { useEffect } from 'react';
import { Container, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import QuizSteps from './QuizSteps';
import Question from './Question';

function Preview() {
  const navigate = useNavigate();

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

  const goBack = () => {
    navigate('/step2');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const goForward = () => {
    // navigate('/step4');
    // code for submit
  };
  return (
    <Container>
      <QuizSteps stepsNum={3} />
      <h2 className='my-4'>Here are your Responses</h2>
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
            onClick={() => goForward()}
          >
            Submit Quiz
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Preview;
