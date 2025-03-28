// import { logout } from '@/action/logout';
import React from 'react';
import { signOut } from 'next-auth/react';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    await signOut();
  };

  return (
    <span onClick={onClick} className='hover:cursor-pointer'>
      {children}
    </span>
  );
};

export default LogoutButton;
