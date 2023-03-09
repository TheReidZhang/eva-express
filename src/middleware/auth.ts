import env from 'service/env';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import model from 'model';
import { Payload } from 'helper/type';
import { ERRORS, errorResponse } from 'service/error';

const { ACCESS_TOKEN_SECRET } = env;

async function auth(req: Request, res: Response, next: Function) {
  try {
    const authorization = req.headers['authorization'];
    if (authorization) {
      const token = authorization.split('Bearer ')[1];
      const { id, role } = jwt.verify(token, ACCESS_TOKEN_SECRET) as Payload;
      switch (role) {
        // case 'admin':
        //   const admin = await model.admin.findOneBy({
        //     id: id,
        //   });
        //   req.admin = admin;
        //   break;
        case 'user':
          const user = await model.userRepository.findOneByOrFail({
            id: id,
          });
          req['user'] = user;
          req['role'] = 'user';
          break;
      }
    }

    next();
  } catch (error) {
    return res.status(401).json(errorResponse(req, ERRORS.UNAUTHORIZED));
  }
}

export default auth;
