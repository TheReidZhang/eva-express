import env from 'service/env';
import os from 'os';
import throng from 'throng';
import _ from 'lodash';

import model from 'model';
import createServer from 'server';
import exit from 'middleware/exit';

const { NODE_ENV, PORT, WEB_CONCURRENCY } = env;
const PROCESSES = NODE_ENV === 'production' ? WEB_CONCURRENCY || os.cpus().length : 1;

async function startServer(processId: number) {
  const server = await createServer();

  try {
    await model.dataSource.initialize();
  } catch (error) {
    console.error('Fail to establish connection to the database', error);
    process.exit(1);
  }

  // Print Process Info
  console.log(`WEB process.pid: ${process.pid}`);
  console.log(`WEB process.env.NODE_ENV: ${NODE_ENV}`);

  // listen server
  server.listen(PORT, () => {
    console.log(`Process ID: ${processId} - Server started on port ${PORT}`);

    // On terminate command: killall node or process.kill(process.pid)
    process.on('SIGTERM', async () => {
      console.log(`Process ${processId} exiting...`);

      // gracefully exit server
      try {
        await exit.gracefulExit(server);
      } catch (error) {
        console.log('Fail to gracefully exit app.', error);
        throw error;
      }
    });
  });
}

throng({
  worker: startServer, // Fn to call in cluster workers (can be async)
  count: _.toNumber(PROCESSES), // Number of workers (cpu count)
  lifetime: Infinity, // Min time to keep cluster alive (ms)
  grace: 5000, // Grace period between signal and hard shutdown (ms)
});
