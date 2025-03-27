'use client';
import { admin } from '@/action/admin';
import RoleGate from '@/components/role-gate';
import SuccessForm from '@/components/SuccessForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';
import React from 'react';
import { toast } from 'sonner';

const AdminPage = () => {
  const clickOnApiRoute = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('Allowed API');
      } else {
        toast.error('Forbidden API');
      }
    });
  };

  const clickOnServerAction = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className='w-[550px]'>
      <CardHeader>
        <p className='text-2xl text-center'>Admin</p>
      </CardHeader>
      <CardContent className='space-y-5'>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <SuccessForm message='You are allowed. It is okay' />
        </RoleGate>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3'>
          <p className='text-sm'>Admin only API route</p>
          <Button onClick={clickOnApiRoute}>Click to test</Button>
        </div>
        <div className='flex flex-row items-center justify-between rounded-lg border p-3'>
          <p className='text-sm'>Admin only Server action</p>
          <Button onClick={clickOnServerAction}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
