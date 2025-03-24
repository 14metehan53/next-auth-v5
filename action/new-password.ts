'use server';
import { db } from '@/lib/db';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import { NewPasswordSchema } from '@/schema';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserEmail } from '@/data/user';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Missing Token' };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid Email' };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token Not Found' };
  }

  const existingUser = await getUserEmail(existingToken?.email);

  if (!existingUser) {
    return { error: 'Email does not exist' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token Has Expired' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Password Changed Update' };
};
