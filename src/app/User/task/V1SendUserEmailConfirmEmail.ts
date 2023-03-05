import { z } from 'zod';
import { Job } from 'bull';
import models from 'models';
import { generateToken } from 'helper/logic';
import email from 'service/email';
import UserConfirmEmailEmail, { UserConfirmEmailEmailProps } from '../email/UserEmailConfirmEmail';

export default async function V1SendUserEmailConfirmEmail(job: Job) {
  console.log(`V1SendUserEmailConfirmEmail - ${job.id}`);
  const schema = z.object({
    id: z.string(),
  });

  const result = schema.safeParse(job.data);
  if (!result.success) throw new Error(`V1SendUserEmailConfirmEmail Invalid Args: ${result.error.issues}`);

  const args = result.data;
  const { id } = args;

  await models.dataSource.transaction(async transactionalEntityManager => {
    const foundUser = await transactionalEntityManager.findOne(models.user, {
      where: {
        id,
      },
      lock: { mode: 'pessimistic_read' },
    });
    if (!foundUser || foundUser.isEmailConfirmed) return;

    foundUser.emailConfirmToken = generateToken();
    await transactionalEntityManager.save(foundUser);
    await email.send<UserConfirmEmailEmailProps>({
      from: email.emails.doNotReply.address,
      name: email.emails.doNotReply.name,
      subject: 'Confirm your email.',
      email: UserConfirmEmailEmail,
      tos: [foundUser.email],
      args: {
        confirmEmailLink: `https://google.com?code=${foundUser.emailConfirmToken}`,
      },
    });
  });
}
