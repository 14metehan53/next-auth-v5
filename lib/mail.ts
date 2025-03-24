import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLinkAddress = `http://localhost:3000/auth/new-verify?token=${token}`;
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Confirm your email Address - NextAuthv5[BETA]',
    html: `<p>Click <a href="${confirmLinkAddress}">here</a> confirm to email</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Reset Password - NextAuthv5[BETA]',
    html: `<p>Click <a href="${resetLink}">here</a> reset a password</p>`,
  });
};
