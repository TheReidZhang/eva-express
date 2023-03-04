const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import entities from 'entities';
import { Payload } from 'helper/types';
import { ERRORS, errorResponse } from 'service/error';

async function auth(req: Request, res: Response, next: Function) {
  try {
    const authorization = req.headers['authorization'];
    if (authorization) {
      const token = authorization.split('Bearer ')[1];
      const { id, role } = jwt.verify(token, ACCESS_TOKEN_SECRET) as Payload;
      switch (role) {
        // case 'admin':
        //   const admin = await entities.admin.findOneBy({
        //     id: id,
        //   });
        //   req.admin = admin;
        //   break;
        case 'user':
          const user = await entities.user.findOneByOrFail({
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

// function routerHandlerWrapper(action: (req, res) => Promise<any>, role: Role[] | null = null) {
//   return async (req, res, next) => {
//     if (role) {
//       const authorization = req.headers['authorization'];
//       if (!authorization || Array.isArray(authorization)) throw new Error('Login required');

//       const token = authorization.split(' ')[1];
//       const payload = verify(token, ACCESS_TOKEN_SECRET) as Payload;

//       if (!role.includes(payload.role)) throw new Error('Login required');

//       switch (payload.role) {
//         case 'user':
//           const user = await entities.user.findOneBy({
//             id: payload.id,
//           });
//           if (user) req.user = user;
//           else throw new Error('Login required');
//           break;
//         // case 'admin':
//         //   const admin = await entities.admin.findOneBy({
//         //     id: payload.id,
//         //   });
//         //   if (admin) req.admin = admin;
//         //   throw new Error('Login required');
//         //   break;
//       }

//       next();
//     }

//     try {
//       const result = await action(req, res);
//       return res.status(result.status).json(result);
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export { routerHandlerWrapper };
