import env from 'service/env';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { createClient, RedisClientType } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';

const { REDIS_URL } = env;

enum ROOMS {
  GLOBAL = 'GLOBAL-',
  ADMIN = 'ADMIN-',
  USER = 'USER-',
}

enum EVENTS {
  ADMIN_CREATED = 'ADMIN_CREATED',
  ADMIN_UPDATED = 'ADMIN_UPDATED',

  USER_EMAIL_CONFIRMED = 'USER_EMAIL_CONFIRMED',
}

let io: Server, pubClient: RedisClientType, subClient: RedisClientType;

async function get(newServer?: http.Server) {
  if (!io) {
    if (newServer) {
      io = new Server(newServer, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });
      pubClient = createClient({ url: REDIS_URL });
      subClient = pubClient.duplicate();
      pubClient.on('error', err => {
        console.error('Socket Pub Redis Client Error', err);
      });
      subClient.on('error', err => {
        console.error('Socket Sub Redis Client Error', err);
      });
      await Promise.all([pubClient.connect(), subClient.connect()]);
      io.adapter(createAdapter(pubClient, subClient));
    } else {
      throw new Error('Fail to initialize socket io connection');
    }
  }
  return io;
}

async function close() {
  try {
    if (pubClient && pubClient.isOpen) {
      await pubClient.disconnect();
    }
    if (subClient && subClient.isOpen) {
      await subClient.disconnect();
    }
  } catch (error) {
    console.error(error);
    throw new Error('Fail to close socket io connection');
  }
}

function connect(socket: Socket) {
  console.log('Client ' + socket.id + ' Connected');

  // join the global room for application
  if (socket.handshake.query.global) socket.join(`${ROOMS.GLOBAL}`);

  // join the admin room for a feature
  if (socket.handshake.query.admin) socket.join(`${ROOMS.ADMIN}${socket.handshake.query.admin}`);

  // join the member room for a feature
  if (socket.handshake.query.user) socket.join(`${ROOMS.USER}${socket.handshake.query.user}`);

  // add more rooms here

  socket.on('disconnect', () => {
    console.log('Client ' + socket.id + ' Disconnected');
  });
}

export default { connect, get, close, ROOMS, EVENTS };
