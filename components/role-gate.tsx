'use client';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import React from 'react';
import ErrorForm from '@/components/ErrorForm';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return <ErrorForm message='You dont have permissions' />;
  }

  return <div>{children}</div>;
};

export default RoleGate;
