import { z } from 'zod';

import bcrypt from 'bcrypt';
import entities from 'entities';
import { ERRORS, errorResponse, zodErrorMessage } from 'service/error';
import { createAccessToken, createRefreshToken } from 'helper/auth';

export default async function (req: IRequest, res: IResponse) {
  const schema = z.object({
    email: z
      .string()
      .email()
      .transform(val => val.toLocaleLowerCase()),
    password: z.string(),
  });
  const result = schema.safeParse(req.args);
  if (!result.success) {
    return errorResponse(req, ERRORS.INVALID_ARGUMENTS, zodErrorMessage(result.error));
  }
  const args = result.data;

  const { email, password } = args;

  const existingUser = await entities.user.findOne({
    where: {
      email,
    },
  });

  if (!existingUser) return errorResponse(req, ERRORS.INVALID_LOGIN_CREDENTIALS);

  const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);

  if (!isCorrectPassword) return errorResponse(req, ERRORS.INVALID_LOGIN_CREDENTIALS);

  const accessToken = createAccessToken({ id: existingUser.id, role: 'user' });
  const refreshToken = createRefreshToken({ id: existingUser.id, role: 'user' });

  return {
    status: 200,
    success: true,
    data: {
      accessToken,
      refreshToken,
    },
  };
}
