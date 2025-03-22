import { auth, signOut } from '@/auth';
import { authRoutes } from '@/routes';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      <div>{JSON.stringify(session)}</div>
      <div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: authRoutes[0] });
          }}
        >
          <button type='submit'>Sign Out</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
