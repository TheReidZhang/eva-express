import { z } from 'zod';
import { ERRORS, errorResponse, zodErrorMessage } from 'service/error';
import entities from 'entities';

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

  return await entities.dataSource.transaction(async transactionalEntityManager => {
    const foundUser = await transactionalEntityManager.findOne(entities.user, {
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
