import { z } from 'zod';
import entities from 'entities';
import { validate } from 'class-validator';
import { ERRORS, errorResponse, zodErrorMessage } from 'service/error';
import { GENDER, LOCALE, PASSWORD_REGEX } from 'helper/constant';

export default async function (req: IRequest) {
  const schema = z.object({
    email: z
      .string()
      .email()
      .transform(val => val.toLocaleLowerCase()),
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    gender: z.nativeEnum(GENDER),
    timezone: z.string().trim().min(1),
    locale: z.nativeEnum(LOCALE),
    phone: z.string().min(1).optional(),
    password: z.string().regex(PASSWORD_REGEX),
  });

  const result = schema.safeParse(req.args);
  if (!result.success) {
    return errorResponse(req, ERRORS.INVALID_ARGUMENTS, zodErrorMessage(result.error));
  }
  const args = result.data;
  const { email, password, firstName, lastName, gender, timezone, locale, phone } = args;

  const existingUser = await entities.user.findOne({
    where: {
      email,
    },
  });
  if (existingUser) return errorResponse(req, ERRORS.USER_ALREADY_EXISTS);

  const user = entities.user.create({
    email,
    password,
    firstName,
    lastName,
    gender,
    timezone,
    locale,
    phone,
  });

  const schemaErrors = await validate(user);
  if (schemaErrors.length > 0) {
    throw new Error(`Validation failed!`);
  } else {
    await user.save();
  }

  return {
    status: 200,
    success: true,
    data: {
      user,
    },
  };
}
