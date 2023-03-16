import { Client } from 'pg';
import config from '../drizzle.config.json';
import fs from 'fs';
import path from 'path';

const client = new Client({
  connectionString: 'postgres://reid@localhost:5432/eva_dev',
});

async function migrate() {
  await client.connect();

  const migrationPath = path.join(__dirname, '..', config.out);

  const files = fs
    .readdirSync(migrationPath)
    .filter(file => file.endsWith('.sql'))
    .sort();

  const sql = `
    CREATE TABLE IF NOT EXISTS "migration" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" TEXT NOT NULL UNIQUE,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`;
  await client.query(sql);

  for (const file of files) {
    try {
      const res = await client.query('SELECT * FROM migration WHERE name=$1;', [file]);
      if (res.rows.length > 0) continue;

      await client.query('BEGIN');
      const filePath = path.join(migrationPath, file);
      const sql = fs.readFileSync(filePath).toString();
      await client.query(sql);

      const migrationSql = 'INSERT INTO migration(name) VALUES ($1)';
      const migrationValue = [file];
      await client.query(migrationSql, migrationValue);

      await client.query('COMMIT');
      console.log(`Successfully migrate ${file} \n`);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    }
  }
  console.log('Database has been update to date.');

  await client.end();
  process.exit(1);
}

migrate();
