import queue from 'service/queue'; // process background tasks from Queue
import { queueError } from 'service/error';

import V1SendUserEmailConfirmEmail from './task/V1SendUserEmailConfirmEmail';

const UserQueue = queue.get('UserQueue');

export default function () {
  UserQueue.process('V1SendUserEmailConfirmEmail', V1SendUserEmailConfirmEmail);
  UserQueue.on('failed', async (job, error) => await queueError(error, UserQueue, job));
  UserQueue.on('stalled', async job => await queueError(new Error('Queue Stalled.'), UserQueue, job));
  UserQueue.on('error', async error => await queueError(error, UserQueue));

  return [UserQueue];
}
