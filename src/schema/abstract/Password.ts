import { text, timestamp } from 'drizzle-orm/pg-core';

const Password = {
  salt: text('salt').notNull(),
  password: text('password').notNull(),

  // Reset Password
  passwordResetToken: text('password_reset_token'),
  passwordResetTokenSentAt: timestamp('password_reset_token_sent_at'),
  passwordResetTokenExpiredAt: timestamp('password_reset_token_expired_at'),
};

export default Password;
