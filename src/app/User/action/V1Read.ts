import { z } from 'zod';
import model from 'model';
import { ERRORS, errorResponse, zodErrorMessage } from 'service/error';

async function V1Read(req: IRequest) {
  let id: string;

  if (req.user) {
    id = req.user.id;
  } else {
    const schema = z.object({
      id: z.string(),
    });

    const result = schema.safeParse(req.args);
    if (!result.success) {
      return errorResponse(req, ERRORS.INVALID_ARGUMENTS, zodErrorMessage(result.error));
    }
    const args = result.data;
    id = args.id;
  }

  const existingUser = await model.userRepository.findOne({
    where: {
      id,
    },
  });

  if (!existingUser) return errorResponse(req, ERRORS.USER_DOES_NOT_EXIST);

  return {
    status: 200,
    success: true,
    data: {
      user: existingUser,
    },
  };
}

export default V1Read;
