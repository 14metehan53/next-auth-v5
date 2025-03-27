'use client';
import React from 'react';
import UserInfoDetailPage from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

const ServerPage = () => {
  const user = useCurrentUser();

  return <UserInfoDetailPage label='Server component' user={user} />;
};

export default ServerPage;
