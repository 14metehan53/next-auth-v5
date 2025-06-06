'use server';
import * as z from 'zod';
import { LoginSchema } from '@/schema';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserEmail } from '@/data/user';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorTokenEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmByUserId } from '@/data/two-factor-confirm';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);

  if (!validateField.success) {
    return { error: 'Invalid Credentials!' };
  }

  const { email, password, code } = validateField.data;

  const existingUser = await getUserEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'email does not exist' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Confirm Email Sent' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenEmail(existingUser.email);

      if (!twoFactorToken) return { error: 'Invalid code' };
      if (twoFactorToken.token !== code) return { error: 'Invalid code' };

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) return { error: 'Code expired' };

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: 'true' };
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid Credentials' };
        default:
          return { error: 'Something Went Wrong' };
      }
    }
    throw error;
  }
};
