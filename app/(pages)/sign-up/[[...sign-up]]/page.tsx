import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => {
  return (
    <div className='flex justify-center items-center my-28 '>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
