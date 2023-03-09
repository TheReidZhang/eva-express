import env from 'service/env';
import Bull, { Queue, QueueEvents } from 'bullmq'; // add background tasks to Queue: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclean
import IORedis from 'ioredis';
import { queueError } from './error';

const { REDIS_URL, NODE_ENV } = env;

// Store all queues here
const QUEUES: Record<string, { queue: Queue; queueEvents: QueueEvents }> = {};

const connection = new IORedis(REDIS_URL, { maxRetriesPerRequest: null });

function get(name: string) {
  if (!QUEUES[name]) {
    const queue = new Queue(name, {
      connection,
    });
    const queueEvents = new QueueEvents(name, { connection });
    QUEUES[name] = {
      queue,
      queueEvents,
    };

    queueEvents.on('failed', async ({ jobId, failedReason }) => {});

    queueEvents.on('stalled', async ({ jobId }) => {});

    queueEvents.on('error', async error => {});
  }

  return QUEUES[name];
}

function getAll() {
  return Object.entries(QUEUES);
}

async function closeAll() {
  // grab list of queue names
  const queueNames = Object.keys(QUEUES);

  // close all queues
  for (let i = 0; i < queueNames.length; i++) {
    try {
      const { queue, queueEvents } = QUEUES[queueNames[i]];

      await queue.close();
      await queueEvents.close();
    } catch (err) {
      console.error(err);
    }
  }
}

export default { QUEUES, get, getAll, closeAll, connection };
