import React, { useState } from 'react';
import { Alert, Toast, ToastContainer } from 'react-bootstrap';

// return <Toast variant={variant}>{children}</Toast>;
const Message = ({ variant, children, status }: any) => {
  const [show, setShow] = useState(status);
  return (
    <ToastContainer className='p-5' position='top-end'>
      <Toast
        onClose={() => setShow(false)}
        bg={variant.toLowerCase()}
        show={show}
        // delay={3000}
        // autohide
      >
        <Toast.Header>
          <img
            src='logo192.png'
            className='rounded me-2'
            alt=''
            height='20'
            width='20'
          />
          <strong className='me-auto'>Message</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

Message.defaultProps = { varaint: 'info', status: true };
export default Message;
