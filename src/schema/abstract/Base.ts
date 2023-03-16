import { bigserial, boolean, timestamp, varchar } from 'drizzle-orm/pg-core';

const Base = {
  id: bigserial('id', { mode: 'bigint' }).primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deleteAt: timestamp('deleted_at'),
};

export default Base;
