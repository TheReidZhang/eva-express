import { z } from 'zod';

const NumberRegex = /^(([1-9][0-9]*)|[0])$/;
const NodeEnvType = ['development', 'production', 'test', 'staging'] as const;
const BooleanType = ['true', 'false'] as const;

const schema = z.object({
  // Express
  NODE_ENV: z.enum(NodeEnvType),
  PORT: z.string().regex(NumberRegex).transform(Number),
  WEB_CONCURRENCY: z.string().regex(NumberRegex).transform(Number).optional(),

  // Auth
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),

  // Rate Limit
  RATE_LIMIT_WINDOW_MS: z.string().regex(NumberRegex).default('60000').transform(Number),
  RATE_LIMIT_MAX_PER_WINDOW: z.string().regex(NumberRegex).default('60').transform(Number),

  // DB
  DATABASE_URL: z.string().url(),
  DB_SSL: z
    .enum(BooleanType)
    .default('false')
    .transform(val => val === 'true'),
  RUNNING_SCRIPT: z
    .enum(BooleanType)
    .default('false')
    .transform(val => val === 'true'),
  TYPEORM_CLI: z
    .enum(BooleanType)
    .default('false')
    .transform(val => val === 'true'),

  // Redis
  REDIS_URL: z.string().url(),

  // Email
  MAILER_DOMAIN: z.string(),
  MAILER_HOST: z.string(),
  MAILER_PORT: z.string().regex(NumberRegex).transform(Number),
  MAILER_AUTH_USER: z.string().email(),
  MAILER_AUTH_PASS: z.string(),

  // Sms
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_NUMBER: z.string(),
});

// REDISCLOUD_URL also considered as REDIS_URL
if (!process.env.REDIS_URL) process.env.REDIS_URL = process.env.REDISCLOUD_URL;

const result = schema.safeParse(process.env);

if (!result.success) {
  console.error('Invalid environment variables:');
  for (const [field, fieldErrors] of Object.entries(result.error.formErrors.fieldErrors)) {
    console.error(`${field}  is ${fieldErrors.join(', ')}`);
  }
  process.exit(1);
}

const env = result.data;
export default env;
