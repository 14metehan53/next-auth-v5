import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/schema';
import { getUserEmail } from '@/data/user';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Credentials({
      authorize: async (credentials): Promise<any> => {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserEmail(email);

          if (!user || !user.password) return;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;

          return;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
