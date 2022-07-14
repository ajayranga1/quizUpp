import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import QuizSteps from './QuizSteps';
import { saveCredentials } from '../actions/credentials';

function Credentials() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2000-01-01');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [docType, setDocType] = useState('');
  const [docNum, setDocNum] = useState('');
  // const [pic, setPic] = useState('');
  const [check, setCheck] = useState(false);

  interface RootState {
    credentials: {
      userInfo: any;
    };
  }

  const { userInfo } = useSelector((state: RootState) => state.credentials);

  useEffect(() => {
    if (userInfo) {
      userInfo.name && setName(userInfo.name);
      userInfo.email && setEmail(userInfo.email);
      userInfo.dob && setDob(userInfo.dob);
      userInfo.fatherName && setFatherName(userInfo.fatherName);
      userInfo.address && setAddress(userInfo.address);
      userInfo.docType && setDocType(userInfo.docType);
      userInfo.docNum && setDocNum(userInfo.docNum);
      // userInfo.pic && setPic(userInfo.pic);
    }
  }, [
    userInfo,
    userInfo.name,
    userInfo.dob,
    userInfo.fatherName,
    userInfo.address,
    userInfo.docType,
    userInfo.docNum,
    // userInfo.pic,
  ]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const submitHandler = (e: any) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setValidated(true);
      dispatch(
        saveCredentials({
          name,
          dob,
          fatherName,
          address,
          docType,
          docNum,
          email,
          // pic,
        })
      );
      navigate('/step2');
    }
  };

  return (
    <Container>
      <QuizSteps stepsNum={1} />
      <Form
        // noValidate
        validated={validated}
        onSubmit={submitHandler}
      >
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter full name'
            value={name}
            required
            minLength={4}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Must be more than 4 character long
          </Form.Control.Feedback>
          <Form.Text className='text-muted'>
            Note:- Name must be same as in document.
          </Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicDob'>
          <Form.Label>Date of Birth.</Form.Label>
          <Form.Control
            type='date'
            value={dob}
            max={new Date('2005/01/01').toISOString().split('T')[0]}
            onChange={(e) => setDob(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Minimum age is 17
          </Form.Control.Feedback>
          <Form.Text className='text-muted'>Note:- Min. age is 17.</Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicFatherName'>
          <Form.Label>Father Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Father name'
            value={fatherName}
            required
            minLength={4}
            onChange={(e) => setFatherName(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Must be more than 4 character long
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicAddress'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your Address'
            value={address}
            required
            minLength={4}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Must be more than 4 character long
          </Form.Control.Feedback>{' '}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formDocType'>
          <Form.Label>Select Document</Form.Label>
          <Form.Control
            as='select'
            aria-label='Select your Document'
            value={docType}
            required
            onChange={(e) => setDocType(e.target.value)}
          >
            <option value='aadhar'>Aadhar card</option>
            <option value='voterid'>Voter ID card</option>
            <option value='passport'>Passport</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicDocNum'>
          <Form.Label>Document Number</Form.Label>
          <Form.Control
            type='text'
            placeholder={
              docType === 'aadhar'
                ? 'Enter your 12 digit Aadhar number'
                : 'Enter your 10 digit Document Number'
            }
            value={docNum}
            minLength={docType === 'aadhar' ? 12 : 10}
            maxLength={docType === 'aadhar' ? 12 : 10}
            required
            onChange={(e) => setDocNum(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Invalid document number
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Enter email'
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Invalid email!
          </Form.Control.Feedback>
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {/* <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>Select Your Profile Pic.</Form.Label>
          <Form.Control
            type='file'
            value={pic}
            onChange={(e) => setPic(e.target.value)}
          />
        </Form.Group> */}
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check
            type='checkbox'
            label='I agree that all the details provided by me are genuine and true.'
            checked={check}
            required
            onChange={(e) => setCheck(e.target.checked)}
            feedback='You must agree before submitting.'
            feedbackType='invalid'
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='mb-5'>
          Next
        </Button>
      </Form>
    </Container>
  );
}

export default Credentials;
