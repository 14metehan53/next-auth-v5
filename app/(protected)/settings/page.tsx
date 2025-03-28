'use client';
import { settings } from '@/action/settings';
import ErrorForm from '@/components/ErrorForm';
import SuccessForm from '@/components/SuccessForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useCurrentUser } from '@/hooks/use-current-user';
import { SettingsSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { SettingsIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const SettingsPage = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const { update } = useSession();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      role: user?.role || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values).then((data) => {
        if (data.error) setError(data.error);
        if (data.success) {
          update();
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <Card className='w-[550px]'>
      <CardHeader>
        <p className='flex text-xl font-light items-center justify-center'>
          <SettingsIcon size={25} /> Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='name'
                      {...field}
                      autoComplete='off'
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {user?.isOAuth === false && (
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='email'
                          {...field}
                          autoComplete='off'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='******'
                          {...field}
                          autoComplete='off'
                          type='password'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='newPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>new Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='******'
                          {...field}
                          autoComplete='off'
                          type='password'
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem className='flex'>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value={UserRole.ADMIN}
                        className='flex items-center'
                      >
                        {/* {user?.role === UserRole.ADMIN && <Check size={15} />} */}
                        ADMIN
                      </SelectItem>
                      <SelectItem value={UserRole.USER}>
                        {/* {user?.role === UserRole.USER && <Check size={15} />} */}
                        USER
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />

                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {user?.isOAuth === false && (
              <FormField
                control={form.control}
                name='isTwoFactorEnabled'
                render={({ field }) => (
                  <FormItem className='flex'>
                    <FormLabel>Two Factor (2FA)</FormLabel>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      ></Switch>
                    </FormControl>
                    <FormDescription>
                      Enable Two Factor auth{' '}
                      <span className='text-green-500 bg-[#00c95056] p-1 text-xs rounded-sm'>
                        Recommended
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <ErrorForm message={error} />
            <SuccessForm message={success} />
            <Button type='submit' disabled={isPending} className='w-full'>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
