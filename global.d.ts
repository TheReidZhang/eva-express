import 'jest-extended';
import { NextFunction, Request, Response } from 'express';
import User from 'entity/User';

declare global {
  /*eslint-disable */
  // var adminFixFn = () => any; // can only use var, let does not work here
  /*eslint-enable */
  namespace NodeJS {
    interface ProcessEnv {
      HOST: string;
      SESSION_SECRET: string;
      NODE_ENV: 'development' | 'production' | 'test';
      REDIS_URL: string;
      REDIS_CLOUD_URL: string;
    }
  }

  interface IRequest extends Request {
    args: any;
    user?: User;
    admin?: any;
  }
}
