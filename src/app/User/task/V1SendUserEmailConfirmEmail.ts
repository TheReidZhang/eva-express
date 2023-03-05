import { z } from 'zod';
import { Job } from 'bull';
import entities from 'entities';
import { createJwtToken, generateToken } from 'helper/logic';
import email from 'service/email';
import UserConfirmEmailEmail, { UserConfirmEmailEmailProps } from '../email/UserEmailConfirmEmail';

export default async function V1SendUserEmailConfirmEmail(job: Job) {
  const schema = z.object({
    id: z.string(),
  });

  const result = schema.safeParse(job.data);
  if (!result.success) throw new Error(`V1SendUserEmailConfirmEmail Invalid Args: ${result.error.issues}`);

  const args = result.data;
  const { id } = args;

  await entities.dataSource.transaction(async transactionalEntityManager => {
    const foundUser = await transactionalEntityManager.findOne(entities.user, {
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
