import { Check, Column, Index } from 'typeorm';
import { Constructor } from './type';

function Email<TBase extends Constructor>(Base: TBase) {
  @Check(`
  (email_confirm_token IS NULL 
    AND email_confirm_token_sent_at IS NULL) OR
  (email_confirm_token IS NOT NULL
    AND email_confirm_token_sent_at IS NOT NULL)`)
  @Check(`
  (email_update_token IS NULL 
    AND email_update_token_sent_at IS NULL 
    AND email_update_token_expired_at IS NULL) OR
  (email_update_token IS NOT NULL
    AND email_update_token_sent_at IS NOT NULL
    AND email_update_token_expired_at IS NOT NULL)`)
  @Index(['email'], { unique: true, where: 'deleted_at IS NULL' })
  @Index(['emailConfirmToken'], { unique: true })
  @Index(['emailUpdateToken'], { unique: true })
  abstract class AbstractBase extends Base {
    @Column({ type: 'character varying' })
    email: string;

    // Email Confirm
    @Column({ type: 'boolean', default: false })
    isEmailConfirmed: boolean;

    @Column({ type: 'character varying', nullable: true })
    emailConfirmToken: string | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    emailConfirmTokenSentAt: Date | null;

    // Email Update
    @Column({ type: 'character varying', nullable: true })
    emailUpdateToken: string | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    emailUpdateTokenSentAt: Date | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    emailUpdateTokenExpiredAt: Date | null;

    @Column({ type: 'character varying', nullable: true })
    updatedEmail: string | null;
  }
  return AbstractBase;
}

export default Email;
