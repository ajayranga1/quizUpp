import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { submitResponse } from '../actions/responses';

const Question = ({ questionData, index, responses, readOnly }: any) => {
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (answer) dispatch(submitResponse({ qId: questionData._id, answer }));
  }, [answer, questionData, dispatch]);

  useEffect(() => {
    if (responses && answer === '') {
      responses.forEach((itm: any) => {
        itm.qId === questionData._id && setAnswer(itm.answer);
      });
    }
  }, [responses, questionData._id, answer]);

  return (
    <ListGroup.Item className='question my-2'>
      <h5 className='questionText d-flex'>
        {index}.
        <p className='capital-first-letter ms-1'>{questionData.statement}</p>
      </h5>
      {questionData &&
        questionData.options.map((option: any, index: number) => (
          <ListGroup.Item
            key={index}
            className={`option d-flex ${
              option.value === answer && 'bg-secondary text-light'
            } ${readOnly === true && 'read-only'}`}
            onClick={() => readOnly !== true && setAnswer(option.value)}
          >
            {String.fromCharCode(index + 65)}.
            <span className='capital-first-letter ms-1'> {option.value}</span>
          </ListGroup.Item>
        ))}
    </ListGroup.Item>
  );
};

export default Question;
