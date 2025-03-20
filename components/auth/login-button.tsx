'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  asChild,
  mode = 'redirect',
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return <span>Login Modal</span>;
  }

  return (
    <span onClick={onClick} className=''>
      {children}
    </span>
  );
};
