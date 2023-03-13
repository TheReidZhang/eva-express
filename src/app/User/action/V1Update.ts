import { z } from 'zod';
import model from 'model';
import { ERRORS, errorResponse, zodErrorMessage } from 'service/error';
import { GENDER, LOCALE } from 'helper/constant';

async function V1Update(req: IRequest) {
  const schema = z.object({
    firstName: z.string().trim().min(1).optional(),
    lastName: z.string().trim().min(1).optional(),
    gender: z.nativeEnum(GENDER).optional(),
    timezone: z.string().trim().min(1).optional(),
    locale: z.nativeEnum(LOCALE).optional(),
  });

  const result = schema.safeParse(req.args);
  if (!result.success) {
    return errorResponse(req, ERRORS.INVALID_ARGUMENTS, zodErrorMessage(result.error));
  }
  const { firstName, lastName, gender, timezone, locale } = result.data;
  const userId = req.user!.id;

  return await model.dataSource.transaction(async transactionalEntityManager => {
    const foundUser = await transactionalEntityManager.findOne(model.user, {
      where: {
        id: userId,
      },
      lock: { mode: 'pessimistic_read' },
    });

    const foundUser2 = await transactionalEntityManager.findOne(model.user, {
      where: {
        id: userId,
      },
      lock: { mode: 'pessimistic_read' },
    });

    if (!foundUser) return errorResponse(req, ERRORS.USER_DOES_NOT_EXIST);

    if (firstName) foundUser.firstName = firstName;
    if (lastName) foundUser.lastName = lastName;
    if (gender) foundUser.gender = gender;
    if (timezone) foundUser.timezone = timezone;
    if (locale) foundUser.locale = locale;

    await transactionalEntityManager.save(foundUser);

    return {
      status: 200,
      success: true,
    };
  });
}

export default V1Update;
