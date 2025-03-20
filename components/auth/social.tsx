import React from 'react';
import { Button } from '@/components/ui/button';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Social = () => {
  return (
    <div className='flex items-center w-full gap-0.5'>
      <Button
        size='lg'
        className='w-[50%] bg-red-600 text-white hover:cursor-pointer hover:bg-red-500 hover:text-white'
        variant='outline'
      >
        <FaGoogle />
      </Button>
      <Button
        size='lg'
        className='w-[50%] hover:cursor-pointer bg-[#090909] hover:bg-[#121212] hover:text-white text-white'
        variant='outline'
      >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Social;
