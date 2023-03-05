const { NODE_ENV, REDIS_URL } = process.env;

import cron from 'cron';
const CronJob = cron.CronJob;

// services
import queue from 'service/queue'; // Queue Service for Background Jobs

// Print Process Info
console.log(`CLOCK process.pid: ${process.pid}`);
console.log(`CLOCK process.env.NODE_ENV: ${NODE_ENV}`);

// https://crontab.guru/

const UserQueue = queue.get('UserQueue');

// Run at every minute from 0 through 59
// new CronJob(
//   '* * * * *',
//   async () => {
//     await UserQueue.add('V1PublicOrHideScheduledFeatureTask', {}, { removeOnComplete: true, removeOnFail: true });
//   },
//   null,
//   true,
//   'UTC'
// );
