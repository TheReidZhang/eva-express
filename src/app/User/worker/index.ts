import queue from 'service/queue'; // process background tasks from Queue
import { Worker } from 'bullmq';
import V1SendUserEmailConfirmEmail from './V1SendUserEmailConfirmEmail';

const queueName = 'UserQueue';

const workers: Worker[] = [
  new Worker(queueName, V1SendUserEmailConfirmEmail, {
    connection: queue.connection,
  }),
];

export default workers;
