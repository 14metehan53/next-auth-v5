'use client';
import { logout } from '@/action/logout';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useSession } from 'next-auth/react';

const SettingsPage = () => {
  const session = useSession();
  const user = useCurrentUser();

  // const onClick = () => {
  //   logout();
  // };

  return (
    <div className='bg-white p-4 rounded-xl'>
      {/* <button onClick={onClick}>Sign Out</button> */}
      {JSON.stringify(session.data)}
    </div>
  );
};

export default SettingsPage;
