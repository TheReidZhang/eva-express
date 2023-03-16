import env from 'service/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const { DATABASE_URL } = env;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle(pool);
export default db;
