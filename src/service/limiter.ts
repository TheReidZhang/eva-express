import env from 'service/env';
import _ from 'lodash';
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient, RedisClientType } from 'redis';

const { REDIS_URL, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_PER_WINDOW } = env;

let limiter, client: RedisClientType;

export default { get, close };
async function get() {
  try {
    if (!limiter) {
      if (!client) {
        client = createClient({ url: REDIS_URL });
        await client.connect();
      }

      limiter = RateLimit({
        windowMs: RATE_LIMIT_WINDOW_MS,
        max: RATE_LIMIT_MAX_PER_WINDOW,

        // Redis store configuration
        store: new RedisStore({
          sendCommand: (...args: string[]) => client.sendCommand(args),
        }),
      });
    }
    return limiter;
  } catch (error) {
    throw new Error('Fail to initialize rater limiter');
  }
}

async function close() {
  try {
    if (client) {
      await client.disconnect();
    }
  } catch (error) {
    throw new Error('Fail to close rate limiter');
  }
}
