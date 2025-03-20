'use server';
import * as z from 'zod';
import { RegisterSchema } from '@/schema';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { getUserEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFiled = RegisterSchema.safeParse(values);

  if (!validateFiled.success) {
    return { error: 'Invalid Credentials!' };
  }

  const { email, password, name } = validateFiled.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserEmail(email);

  if (existingUser) return { error: 'email is already!' };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: 'Email Sent! please check EmailBox' };
};
