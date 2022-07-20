import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col, Row, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import QuizSteps from './QuizSteps';
import Meta from './Meta';
import Loader from './Loader';
import Message, { TContainer } from './Message';
import { saveCredentials } from '../actions/credentials';
import { uploadImage, uploadImageClear } from '../actions/uploadImage';

function Credentials() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('2000-01-01');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [docType, setDocType] = useState('aadhar');
  const [docNum, setDocNum] = useState('');
  const [image, setImage] = useState('');
  const [check, setCheck] = useState(false);
  const [uploading, setUploading] = useState(false);

  interface RootState {
    credentials: {
      userInfo: any;
      loading: boolean;
    };
    uploadImage: {
      imageUrl: string;
      loading: boolean;
      error: any;
      success: boolean;
    };
    submitQuiz: {
      success: boolean;
      loading: boolean;
      error: any;
    };
  }

  const { userInfo, loading } = useSelector(
    (state: RootState) => state.credentials
  );
  const {
    imageUrl,
    loading: uploadImageLoading,
    success,
    error,
  } = useSelector((state: RootState) => state.uploadImage);
  const { success: succesSubmitQuiz } = useSelector(
    (state: RootState) => state.submitQuiz
  );

  useEffect(() => {
    if (userInfo) {
      userInfo.name && setName(userInfo.name);
      userInfo.email && setEmail(userInfo.email);
      userInfo.dob && setDob(userInfo.dob);
      userInfo.fatherName && setFatherName(userInfo.fatherName);
      userInfo.address && setAddress(userInfo.address);
      userInfo.docType && setDocType(userInfo.docType);
      userInfo.image && setImage(userInfo.image);
      userInfo.docNum && setDocNum(userInfo.docNum);
    }
  }, [
    userInfo,
    userInfo.name,
    userInfo.dob,
    userInfo.fatherName,
    userInfo.address,
    userInfo.docType,
    userInfo.image,
    userInfo.docNum,
  ]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  useEffect(() => {
    if (imageUrl) setImage(imageUrl);
  }, [imageUrl]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    if (validated === true && form.checkValidity() === true) {
      dispatch(
        saveCredentials({
          name,
          dob,
          fatherName,
          address,
          docType,
          docNum,
          email,
          image,
        })
      );
      navigate('/step2');
    }
  };
  const uploadFileHandler = (e: any) => {
    dispatch(uploadImage(e.target.files[0]));
  };

  return (
    <>
      <Meta title={'Credentials'} />
      <TContainer>
        {Object.keys(error).length > 0 && (
          <Message variant='danger' afterClose={() => uploadImageClear()}>
            {JSON.stringify(error)}
          </Message>
        )}
      </TContainer>
      <Container>
        <QuizSteps stepsNum={1} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form noValidate validated={validated} onSubmit={submitHandler}>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter full name'
                  value={name}
                  minLength={4}
                  required
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
                <Form.Text className='text-muted'>
                  Note:- Min. age is 17.
                </Form.Text>
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
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Form.Group
                  as={Col}
                  md='5'
                  className='mb-3'
                  controlId='formDocType'
                >
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
                <Form.Group
                  as={Col}
                  className='mb-3'
                  controlId='formBasicDocNum'
                >
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
                    {docType === 'aadhar'
                      ? 'Enter your 12 digit Aadhar number'
                      : 'Enter your 10 digit Document Number'}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
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
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={name && name}
                  roundedCircle
                  height='50'
                  width='50'
                />
              )}
              <Row>
                {uploadImageLoading ? (
                  <Loader />
                ) : (
                  <Form.Group
                    as={Col}
                    md='6'
                    controlId='formFile'
                    className='mb-3'
                  >
                    <Form.Label>Select Your Profile Pic.</Form.Label>
                    <Form.Control
                      type='file'
                      placeholder='Choose your image'
                      capture='environment'
                      accept='image/*'
                      onChange={uploadFileHandler}
                    />
                  </Form.Group>
                )}
                <Form.Group
                  as={Col}
                  md='6'
                  className='mb-3'
                  controlId='formBasicPicUrl'
                >
                  <Form.Label>Or Paste Pic URL</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter pic url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </Form.Group>
              </Row>
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
          </>
        )}
      </Container>
    </>
  );
}

export default Credentials;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// // import { fetchProduct, updateProduct } from '../actions/productActions';
// // import {
// //   PRODUCT_UPDATE_RESET,
// //   PRODUCT_FETCH_RESET,
// // } from '../constants/productConstants';
// import { Link, useParams } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// // import FormContainer from '../components/FormContainer';
// import axios from 'axios';

// const Credentials = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const productId = params.id;
//   // const history = useHistory();
//   const product: any = [];
//   var loadingProductDetails: false;
//   var error: {};
//   var successProductDetails: false;
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [countInStock, setCountInStock] = useState(0);
//   const [image, setImage] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [uploading, setUploading] = useState(false);
//   // const [user, setUser] = useState("");
//   const submitHandler = (e: any) => {
//     e.preventDefault();
//     // dispatch(
//     //   updateProduct({
//     //     _id: productId,
//     //     name,
//     //     price,
//     //     countInStock,
//     //     image,
//     //     brand,
//     //     category,
//     //     description,
//     //   })
//     // );
//   };
//   const uploadFileHnadler = async (e: any) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('image', file);
//     setUploading(true);
//     try {
//       const config = {
//         headers: { 'Content-type': 'multipart/form-data' },
//       };
//       const { data } = await axios.post('/api/upload', formData, config);
//       setImage(data);
//       setUploading(false);
//     } catch (error) {
//       console.log(error);
//       setUploading(false);
//     }
//   };
//   var successProductUpdate = false;
//   var loadingProductUpdate = false;
//   var errorProductUpdate = {};
//   // } = useSelector((state: any) => state.productUpdate);
//   // useEffect(() => {
//   //   if (Object.keys(product).length === 0) {
//   //     // dispatch(fetchProduct(productId));
//   //   } else {
//   //     setName(product.name);
//   //     setPrice(product.price);
//   //     setCountInStock(product.countInStock);
//   //     setImage(product.image);
//   //     setBrand(product.brand);
//   //     setCategory(product.category);
//   //     setDescription(product.description);
//   //   }
//   //   if (successProductUpdate) {
//   //     // dispatch({ type: PRODUCT_FETCH_RESET });
//   //     // dispatch({ type: PRODUCT_UPDATE_RESET });
//   //     // history.push('/admin/productList');
//   //   }
//   // }, [
//   //   // history,
//   // ]);
//   return (
//     <>
//       <Link className='btn btn-light my-3' to={`/admin/productList`}>
//         Go back
//       </Link>
//       <div>
//         <h1>Update Product</h1>
//         <Form onSubmit={submitHandler}>
//           <Form.Group controlId='name'>
//             <Form.Label>Product Name : </Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter product name...'
//               value={name}
//               required
//               name='name'
//               onChange={(e) => setName(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='category'>
//             <Form.Label>Product category : </Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter product category...'
//               value={category}
//               required
//               name='category'
//               onChange={(e) => setCategory(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='image'>
//             <Form.Label>Product Image : </Form.Label>
//             <Form.Control
//               type='text'
//               value={image}
//               placeholder='Enter image url...'
//               required
//               name='image'
//               onChange={(e) => setImage(e.target.value)}
//             ></Form.Control>
//             {uploading ? (
//               <Loader />
//             ) : (
//               <Form.Control
//                 type='file'
//                 className='mt-2'
//                 // id='image-file'
//                 // label='Choose File'
//                 // custom
//                 accept='.jpg,.png,.jpeg'
//                 onChange={uploadFileHnadler}
//               ></Form.Control>
//             )}
//           </Form.Group>
//           <Form.Group controlId='brand'>
//             <Form.Label>Product Brand : </Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter Brand Name...'
//               value={brand}
//               required
//               name='brand'
//               onChange={(e) => setBrand(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='description'>
//             <Form.Label>Product Description : </Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Enter Description...'
//               value={description}
//               required
//               name='description'
//               onChange={(e) => setDescription(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='price'>
//             <Form.Label>Product Price : </Form.Label>
//             <Form.Control
//               type='number'
//               placeholder='Enter product price...'
//               value={price}
//               required
//               name='price'
//               onChange={(e: any) => setPrice(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Form.Group controlId='countInStock'>
//             <Form.Label>Product Count In Stock : </Form.Label>
//             <Form.Control
//               type='number'
//               placeholder='Count In Stock ...'
//               value={countInStock}
//               required
//               name='countInStock'
//               onChange={(e: any) => setCountInStock(e.target.value)}
//             ></Form.Control>
//           </Form.Group>
//           <Button type='submit' variant='light'>
//             Update
//           </Button>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default Credentials;
