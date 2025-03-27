'use client';
import UserInfoDetailPage from '@/components/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react';

const ClientPage = () => {
  const user = useCurrentUser();

  return <UserInfoDetailPage label='Client component' user={user} />;
};

export default ClientPage;
