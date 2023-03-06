import env from 'service/env';
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import sslRedirect from 'heroku-ssl-redirect';
import helmet from 'helmet';
import cors from 'cors';
import exit from 'middleware/exit';
import cookieParser from 'cookie-parser';
import { LOCALE_LIST } from 'helper/constant';
import path from 'path';
import i18n from 'i18n';
import router from 'routes';
import args from 'middleware/args';
import auth from 'middleware/auth';
import socket from 'service/socket';
import error from 'middleware/error';
import limiter from 'service/limiter';

const { NODE_ENV } = env;

async function createServer() {
  const app = express();

  // Disable the "Powered-By" header to prevent showing hackers what infra we use
  app.disable('x-powered-by');

  const newServer = http.createServer(app);
  app.use(express.json());

  const io = await socket.get(newServer);

  // enable ssl redirect in production
  app.use(sslRedirect());

  // need to enable this in production because Heroku uses a reverse proxy
  if (NODE_ENV === 'production') app.set('trust proxy', 1); // get ip address using req.ip

  // This is just so we don't have to worry about shutting down the redis connection for the rate limiter, which has mem leaks in testing
  if (NODE_ENV === 'production') {
    const rateLimiter = await limiter.get();
    app.use(rateLimiter);
  }

  // log requests using morgan, don't log in test env
  if (NODE_ENV !== 'test') app.use(morgan('dev'));

  app.use(cors({ origin: '*', credentials: true })); // handle cors
  app.use(helmet()); // protect against vulnerabilities

  // set up language
  i18n.configure({
    locales: LOCALE_LIST, // set the languages here
    defaultLocale: LOCALE_LIST[0], // default is the first index
    queryParameter: 'lang', // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
    cookie: 'i18n-locale', // if you change cookie name, you must also change in verifyJWTAuth res.cookie
    directory: path.join(__dirname, 'locale'),
    // objectNotation: true // hierarchical translation catalogs. To enable this feature, be sure to set objectNotation to true
  });

  // you will need to use cookieParser to expose cookies to req.cookies
  app.use(cookieParser());

  // i18n init parses req for language headers, cookies, etc.
  // NOTE: If user is logged in, locale is set in verifyJWTAuth method
  app.use(i18n.init);

  app.use(exit.middleware);
  app.use(args.attach); // set req.args
  app.use(auth);

  app.use('/', router); // place routes here

  app.use(error);
  io.on('connection', socket.connect);

  return newServer;
}

export default createServer;
