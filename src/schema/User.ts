import { pgTable, bigserial, text, varchar, InferModel, integer, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';
import Email from './abstract/Email';
import Password from './abstract/Password';
import Phone from './abstract/Phone';
import Base from './abstract/Base';
import { eq, isNull, ne } from 'drizzle-orm/expressions';

export const user = pgTable(
  'user',
  {
    ...Base,
    ...Password,
    ...Email,
    ...Phone,

    lastName: varchar('last_name').notNull(),
    firstName: varchar('first_name').notNull(),

    gender: text('gender').notNull(),
    timezone: text('timezone').notNull(),
    locale: text('locale').notNull(),
    loginCount: integer('login_count').default(0).notNull(),
    lastLoginAt: timestamp('last_login_at'),
  },
  table => ({
    emailUniqueIndex: uniqueIndex('user_email_unique_index').on(table.email).where(isNull(table.deleteAt)),
  })
);

export type User = InferModel<typeof user>;
export type InsertUser = InferModel<typeof user, 'insert'>;
export type SelectUser = InferModel<typeof user, 'select'>;
