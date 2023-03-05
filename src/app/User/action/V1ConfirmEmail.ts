import { z } from 'zod';
import { ERRORS, errorResponse, zodErrorMessage } from 'service/error';
import models from 'models';

export default async function V1ConfirmEmail(req: IRequest) {
  const schema = z.object({
    emailConfirmToken: z.string(),
  });

  const result = schema.safeParse(req.args);
  if (!result.success) {
    return errorResponse(req, ERRORS.INVALID_ARGUMENTS, zodErrorMessage(result.error));
  }
  const args = result.data;
  const { emailConfirmToken } = args;

  return await models.dataSource.transaction(async transactionalEntityManager => {
    const foundUser = await transactionalEntityManager.findOne(models.user, {
      where: {
        emailConfirmToken,
      },
      lock: { mode: 'pessimistic_read' },
    });

    if (!foundUser) return errorResponse(req, ERRORS.INVALID_EMAIL_CONFIRMATION_TOKEN);

    if (foundUser.isEmailConfirmed) return errorResponse(req, ERRORS.EMAIL_ALREADY_CONFIRMED);

    foundUser.isEmailConfirmed = true;
    foundUser.emailConfirmToken = null;
    await transactionalEntityManager.save(foundUser);

    return {
      status: 200,
      success: true,
    };
  });
}
