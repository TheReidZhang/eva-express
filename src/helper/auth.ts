const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

import { sign } from 'jsonwebtoken';
import { Payload, Role } from './types';
import { ERRORS, errorResponse } from 'service/error';

export { createAccessToken, createRefreshToken, routerHandlerWrapper };

function createAccessToken({ id, role }: Payload) {
  return sign(
    {
      id,
      role,
    },
    ACCESS_TOKEN_SECRET
  );
}

function createRefreshToken({ id, role }: Payload) {
  return sign(
    {
      id,
      role,
    },
    REFRESH_TOKEN_SECRET
  );
}

function routerHandlerWrapper(action: (req, res) => Promise<any>, roles: Role[] | null = null) {
  return async (req, res, next) => {
    if (roles && !roles.includes(req.role)) {
      return res.status(401).json(errorResponse(req, ERRORS.UNAUTHORIZED));
    }
    try {
      const result = await action(req, res);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
}
