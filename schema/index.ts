import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is Required',
  }),
  password: z.string().min(1, {
    message: 'Password is Required',
  }),
  code: z.optional(z.string()), // 2FA
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

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(8)),
    newPassword: z.optional(z.string().min(8)),
  })
  .refine(
    (data) => {
      if (data.password && data.newPassword) return false;
      return true;
    },
    {
      message: 'New Password is required',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {
      message: 'Password is required',
      path: ['password'],
    }
  );
