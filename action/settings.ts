'use server';
import { getUserById, getUserEmail } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { unstable_update } from '@/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';
import { SettingsSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) return { error: 'Unauthorized' };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: 'Unauthorized' };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email is already' };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Email is sent verification' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) return { error: 'Wrong password!' };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updateUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: {
      name: updateUser.name,
      email: updateUser.email,
      isTwoFactorEnabled: updateUser.isTwoFactorEnabled,
      role: updateUser.role,
    },
  });

  return { success: 'Settings saved' };
};
