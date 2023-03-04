/**
 * Middleware for graceful exit
 */

'use strict';

const { NODE_ENV } = process.env; // get node env

// services
import queue from 'service/queue';
import { Server } from 'http';
import entities from 'entities';
import { ERRORS, errorResponse } from 'service/error';

// whether server is shutting down or not
let isShuttingDown = false;

export default { gracefulExit, middleware };

async function gracefulExit(server: Server) {
  // if not already shutting down
  if (!isShuttingDown) {
    isShuttingDown = true;
    console.log('Received kill signal (SIGTERM), shutting down...');

    // force close after 30 seconds
    setTimeout(() => {
      console.log('Could not close connections in time, forcefully shutting down...');
      process.exit(1);
    }, 30000);

    // close all queue connections
    await queue.closeAll();
    console.log('All queue connections are closed.');

    await entities.dataSource.destroy();
    console.log('Database connection is closed.');

    // close socket io connection
    // await socket.close();
    // console.log('Socket connection is closed.');

    // // close redis connections
    // await session.close();
    // console.log('Session connection is closed.');

    // close all remaining connections
    server.close(() => {
      console.log('Closed all remaining connections.');
      process.exit(0);
    });
  } // END if not already shutting down
}

/**
 * Stops new incoming requests while the server is shutting down
 */
function middleware(req, res, next) {
  // if not shutting down, continue
  if (!isShuttingDown) return next();

  res.set('Connection', 'close');
  return res.status(503).json(errorResponse(req, ERRORS.SERVICE_UNAVAILABLE));
} // END middleware
