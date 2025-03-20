const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-full flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      {children}
    </div>
  );
};

export default LayoutPage;
