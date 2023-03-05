import os from 'os';
import throng from 'throng';
import entities from 'entities';
import queue from 'service/queue';
import UserWorker from 'app/User/worker';
import _ from 'lodash';

const { NODE_ENV, WEB_CONCURRENCY } = process.env;
const PROCESSES = NODE_ENV === 'production' ? WEB_CONCURRENCY || os.cpus().length : 1;

// Store all worker routes here
const workerRoutes = [UserWorker];

// function to start app
async function startWorker(processId) {
  // Print Process Info
  console.log(`WORKER processId: ${processId}`);
  console.log(`WORKER process.pid: ${process.pid}`);
  console.log(`WORKER process.env.NODE_ENV: ${NODE_ENV}`);

  // to check if database connection is established
  try {
    await entities.dataSource.initialize();
  } catch (error) {
    console.error('Fail to establish connection to the database', error);
    process.exit(1);
  }

  // GlobalQueue
  queue.get('GlobalQueue');

  // Initiate and run all feature workers
  workerRoutes.forEach(worker => worker());

  // Graceful exit
  process.on('SIGTERM', async () => {
    // close connection to queue
    await queue.closeAll();
    console.log('All queue connections closed.');

    // close connection to database
    await entities.dataSource.destroy();
    console.log('Database connections closed.');

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
