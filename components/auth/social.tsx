import React from 'react';
import { Button } from '@/components/ui/button';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const Social = () => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className='flex items-center w-full gap-0.5'>
      <Button
        size='lg'
        className='w-[50%] bg-red-600 text-white hover:cursor-pointer hover:bg-red-500 hover:text-white'
        variant='outline'
        onClick={() => onClick('google')}
      >
        <FaGoogle />
      </Button>
      <Button
        size='lg'
        className='w-[50%] hover:cursor-pointer bg-[#090909] hover:bg-[#121212] hover:text-white text-white'
        variant='outline'
        onClick={() => onClick('github')}
      >
        <FaGithub />
      </Button>
    </div>
  );
};

export default Social;
