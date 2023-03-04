const { NODE_ENV, DATABASE_URL, DB_SSL, RUNNING_SCRIPT, TYPEORM_CLI } = process.env;

import 'reflect-metadata';

import fs from 'fs';
import path from 'path';
import { DataSource } from 'typeorm';
import namingStrategy from 'orm/namingStrategy';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: DATABASE_URL,
  dropSchema: NODE_ENV === 'test',
  synchronize: NODE_ENV === 'test',
  logging: false,
  namingStrategy: namingStrategy,
  entities: [path.join(__dirname, '..', 'entity', '*.{ts,js}')],
  migrations:
    TYPEORM_CLI === 'true'
      ? [path.join('src', 'migration', '**', '*.{ts,js}')]
      : [path.join(__dirname, '..', 'migration', '**', '*.{ts,js}')],
  subscribers: [path.join(__dirname, '..', 'subscriber', '*.{ts,js}')],
  migrationsRun: false,
  ssl:
    RUNNING_SCRIPT === 'true'
      ? {
          rejectUnauthorized: false, // Need this b/c it would prompt `Hostname/IP does not match certificate's altnames` error. And this flag ignores it.
          ca: fs.readFileSync('config/pg-certificates/root.crt').toString(),
          key: fs.readFileSync('config/pg-certificates/postgresql.key').toString(),
          cert: fs.readFileSync('config/pg-certificates/postgresql.crt').toString(),
        }
      : NODE_ENV === 'production' || DB_SSL === 'true'
      ? { rejectUnauthorized: false }
      : false,
});

export default AppDataSource;
