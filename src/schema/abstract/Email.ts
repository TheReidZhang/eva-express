import { boolean, timestamp, varchar } from 'drizzle-orm/pg-core';

const Email = {
  email: varchar('email').notNull(),

  // Email Confirm
  isEmailConfirmed: boolean('is_email_confirmed').default(false).notNull(),
  emailConfirmToken: varchar('email_confirm_token'),
  emailConfirmTokenSentAt: timestamp('email_confirm_token_sent_at'),

  // Email Update
  emailUpdate: varchar('email_update'),
  emailUpdateToken: varchar('email_update_token'),
  emailUpdateTokenSentAt: timestamp('email_update_token_sent_at'),
  emailUpdateTokenExpiredAt: timestamp('email_update_token_expired_at'),
};

export default Email;
