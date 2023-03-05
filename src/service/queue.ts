import env from 'service/env'
import Bull, { Queue } from 'bull'; // add background tasks to Queue: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclean

const { REDIS_URL, NODE_ENV } = env

// Store all queues here
const QUEUES: Record<string, any> = {};

export default { QUEUES, get, getAll, closeAll };
/**
 * Return a queue, create if does not exists yet
 *
 * @name - (STRING - REQUIRED): The name of the queue
 *
 * return: a queue
 */
function get(name: string): Queue {
  if (!QUEUES[name]) {
    QUEUES[name] = new Bull(name, {
      redis: REDIS_URL
    });
  }

  return QUEUES[name];
} // END get

/**
 * Return a list of all the queues
 */
function getAll() {
  return Object.entries(QUEUES);
}

/**
 * Close all queues
 *
 * return: true/false
 */
async function closeAll() {
  // grab list of queue names
  const queueNames = Object.keys(QUEUES);

  // close all queues
  for (let i = 0; i < queueNames.length; i++) {
    try {
      const q = QUEUES[queueNames[i]];

      // gracefully disconnect
      q.client.disconnect();
      await q.close();
    } catch (err) {
      console.error(err);
    }
  }
} // END closeAll
