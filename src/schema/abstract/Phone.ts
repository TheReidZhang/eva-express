import { boolean, timestamp, varchar } from 'drizzle-orm/pg-core';

const Phone = {
  phone: varchar('phone'),

  // Phone Confirm
  isPhoneConfirmed: boolean('is_phone_confirmed').default(false).notNull(),
  phoneConfirmToken: varchar('phone_confirm_token'),
  phoneConfirmTokenSentAt: timestamp('phone_confirm_token_sent_at'),
  phoneConfirmTokenExpiredAt: timestamp('phone_confirm_token_expired_at'),

  // Phone Update
  phoneUpdate: varchar('phone_update'),
  phoneUpdateToken: varchar('phone_update_token'),
  phoneUpdateTokenSentAt: timestamp('phone_update_token_sent_at'),
  phoneUpdateTokenExpiredAt: timestamp('phone_update_token_expired_at'),
};

export default Phone;
