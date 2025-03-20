import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { FaUnlock } from 'react-icons/fa';

export default function Home() {
  return (
    <main className='flex h-full flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <div className='space-y-5 text-center'>
        <h1 className='flex items-center font-semibold text-7xl gap-2 text-white'>
          <FaUnlock /> Auth
        </h1>
        <p className='text-white text-lg'>A Simple Auth Service</p>
      </div>
      <div className='mt-5'>
        <LoginButton>
          <Button
            className='hover:cursor-pointer'
            variant='secondary'
            size='lg'
          >
            SignIn
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
