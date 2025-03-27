'use client';
import React from 'react';
import UserButton from '@/components/auth/user-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='bg-slate-300 flex mb-2 justify-between items-center p-4 rounded-lg shadow-sm w-[550px]'>
      <div className='flex gap-x-3'>
        <Button
          asChild
          variant={pathname === '/server' ? 'default' : 'outline'}
        >
          <Link href={'/server'}>Server</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/client' ? 'default' : 'outline'}
        >
          <Link href={'/client'}>Client</Link>
        </Button>
        <Button
          asChild
          variant={pathname === '/settings' ? 'default' : 'outline'}
        >
          <Link href={'/settings'}>Settings</Link>
        </Button>
        <Button asChild variant={pathname === '/admin' ? 'default' : 'outline'}>
          <Link href={'/admin'}>Admin</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
