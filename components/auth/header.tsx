import { FaUnlock } from 'react-icons/fa';

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className='flex w-full flex-col gap-4 items-center justify-center'>
      <h1 className='flex gap-1 items-center text-4xl font-semibold'>
        <FaUnlock /> Auth
      </h1>
      <p className='mt-3'>{label}</p>
    </div>
  );
};

export default Header;
