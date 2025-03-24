import React from 'react';
import { MdCheckCircle } from 'react-icons/md';

interface SuccessFormProps {
  message?: string;
}

const SuccessForm = ({ message }: SuccessFormProps) => {
  if (!message) return null;

  return (
    <div className='bg-[#00c95062] text-xs mb-2 flex items-center justify-center gap-x-2 text-green-500 rounded-sm p-2 text-center'>
      <MdCheckCircle size={22} /> {message}
    </div>
  );
};

export default SuccessForm;
