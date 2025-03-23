import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from '@/schema';
import { getUserEmail } from '@/data/user';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials): Promise<any> {
        try {
          const validateFields = LoginSchema.safeParse(credentials);
          if (validateFields.success) {
            const { email, password } = validateFields.data;
            const user = await getUserEmail(email);
            if (!user || !user.password) return;
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) return user;
            return;
          }
        } catch {
          return;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
