import { z } from 'zod';
import model from 'model';
import { ERRORS, errorResponse, zodErrorMessage } from 'service/error';
import { GENDER, LOCALE, PASSWORD_LENGTH_MIN, PASSWORD_REGEX } from 'helper/constant';
import queue from 'service/queue';
import { V1SendUserEmailConfirmEmailProps } from 'app/User/worker/V1SendUserEmailConfirmEmail';
import { eq } from 'drizzle-orm/expressions';
import _ from 'lodash';
import { genSaltSync, hashSync } from 'bcrypt';

const UserQueue = queue.get('UserQueue');

async function V1Register(req: IRequest) {
  const schema = z.object({
    email: z
      .string()
      .email()
      .transform(val => val.toLowerCase()),
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

  const existingUser = await model.db.select().from(model.user).where(eq(model.user.email, email));
  if (existingUser) return errorResponse(req, ERRORS.USER_ALREADY_EXISTS);

  const salt = genSaltSync(PASSWORD_LENGTH_MIN);
  const hashedPassword = hashSync(password, salt);

  const [user] = await model.db
    .insert(model.user)
    .values({
      email,
      password: hashedPassword,
      salt,
      firstName,
      lastName,
      gender,
      timezone,
      locale,
      phone,
    })
    .returning();

  const data: V1SendUserEmailConfirmEmailProps = { id: _.toString(user.id) };
  await UserQueue.queue.add('V1SendUserEmailConfirmEmail', data);

  return {
    status: 201,
    success: true,
  };
}

export default V1Register;
