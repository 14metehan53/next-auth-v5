import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is Required',
  }),
  password: z.string().min(1, {
    message: 'Password is Required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is Required',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: 'Minimum 8 Character is required',
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is Required',
  }),
  password: z.string().min(8, {
    message: 'Password is Required',
  }),
  name: z.string().min(6, {
    message: 'Name is Required',
  }),
});
