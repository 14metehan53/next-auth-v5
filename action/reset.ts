'use server';
import { getUserEmail } from '@/data/user';
import { sendResetPasswordEmail } from '@/lib/mail';
import { generatePasswordToken } from '@/lib/token';
import { ResetSchema } from '@/schema';
import * as z from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid Email' };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserEmail(email);

  if (!existingUser) {
    return { error: 'Email Not Found' };
  }

  const passwordResetToken = await generatePasswordToken(email);

  await sendResetPasswordEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset Email Sent' };
};
