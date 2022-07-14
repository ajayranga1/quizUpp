import React from 'react';
import { Container } from 'react-bootstrap';

type propTypes = { stepsNum: number };

const QuizSteps = ({ stepsNum }: propTypes) => {
  return (
    <Container>
      <div className='stepsWrapper d-flex p-2 flex-row justify-content-center align-items-center my-3'>
        <div className='d-flex align-items-center py-2 px-3 rounded-3'>
          <span className='xl text-light fw-bold'>Credentials</span>
        </div>
        <div
          className={`d-flex align-items-center py-2 px-3 rounded-3 ${
            stepsNum > 1 ? 'text-light' : 'inactive'
          }  ms-3`}
        >
          <span className='xl'>Quiz</span>
        </div>
        <div
          className={`d-flex align-items-center py-2 px-3 rounded-3 ${
            stepsNum > 2 ? 'text-light' : 'inactive'
          }  ms-3`}
        >
          <span className='xl'>Preview / Submit</span>
        </div>
      </div>
    </Container>
  );
};
QuizSteps.defaultProps = {
  stepsNum: 1,
};
export default QuizSteps;
