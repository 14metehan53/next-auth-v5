import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label: string;
}

const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button asChild variant={'link'} className='w-full'>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
