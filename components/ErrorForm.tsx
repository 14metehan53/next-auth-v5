import React from 'react';
import { VscError } from 'react-icons/vsc';

interface ErrorFormProps {
  message?: string;
}

const ErrorForm = ({ message }: ErrorFormProps) => {
  if (!message) return null;

  return (
    <div className='bg-[#fb2c3662] mb-2 flex items-center justify-center gap-x-2 text-red-500 rounded-sm p-2 text-center'>
      <VscError size={18} /> {message}
    </div>
  );
};

export default ErrorForm;
