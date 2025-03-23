import React from 'react';
import CardWrapper from '@/components/auth/card-wrapper';
import { MdDangerous } from 'react-icons/md';

const ErrorWrapper = () => {
  return (
    <CardWrapper
      headerLabel='Ooops! Something Went Wrong'
      backButtonHref='/auth/login'
      backButtonLabel='back to login'
    >
      <div className='flex justify-center items-center w-full'>
        <MdDangerous size={100} className='text-red-700' />
      </div>
    </CardWrapper>
  );
};

export default ErrorWrapper;
