import env from 'service/env';
import os from 'os';
import throng from 'throng';
import models from 'models';
import queue from 'service/queue';
import UserWorker from 'app/User/worker';
import _ from 'lodash';

const { NODE_ENV, WEB_CONCURRENCY } = env;
const PROCESSES = NODE_ENV === 'production' ? WEB_CONCURRENCY || os.cpus().length : 1;

// Store all worker routes here
const workers = [...UserWorker];

// function to start app
async function startWorker(processId) {
  // Print Process Info
  console.log(`WORKER processId: ${processId}`);
  console.log(`WORKER process.pid: ${process.pid}`);
  console.log(`WORKER process.env.NODE_ENV: ${NODE_ENV}`);

  // to check if database connection is established
  try {
    await models.dataSource.initialize();
  } catch (error) {
    console.error('Fail to establish connection to the database', error);
    process.exit(1);
  }

  // GlobalQueue
  queue.get('GlobalQueue');

  // Graceful exit
  process.on('SIGTERM', async () => {
    // close connection to queue
    await queue.closeAll();
    console.log('All queue connections closed.');

    // close connection to database
    await models.dataSource.destroy();
    console.log('Database connections closed.');

    for (const worker of workers) await worker.close();
    console.log('All worker connections closed.');

    // exit
    process.exit(0);
  });
}

throng({
  worker: startWorker, // Fn to call in cluster workers (can be async)
  count: _.toNumber(PROCESSES), // Number of workers (cpu count)
  lifetime: Infinity, // Min time to keep cluster alive (ms)
  grace: 5000, // Grace period between signal and hard shutdown (ms)
});
