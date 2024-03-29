import { Check, Column, Index } from 'typeorm';
import { Constructor } from './type';

function Phone<TBase extends Constructor>(Base: TBase) {
  @Check(`
  (phone_confirm_token IS NULL 
    AND phone_confirm_token_sent_at IS NULL
    AND phone_confirm_token_expired_at IS NULL) OR
  (phone_confirm_token IS NOT NULL
    AND phone_confirm_token_sent_at IS NOT NULL
    AND phone_confirm_token_expired_at IS NOT NULL)`)
  @Check(`
  (phone_update_token IS NULL 
    AND phone_update_token_sent_at IS NULL 
    AND phone_update_token_expired_at IS NULL) OR
  (phone_update_token IS NOT NULL
    AND phone_update_token_sent_at IS NOT NULL
    AND phone_update_token_expired_at IS NOT NULL)`)
  @Index(['phone'], { unique: true, where: 'deleted_at IS NULL' })
  @Index(['phoneConfirmToken'], { unique: true })
  @Index(['phoneUpdateToken'], { unique: true })
  abstract class AbstractBase extends Base {
    @Column({ type: 'character varying', nullable: true })
    phone: string | null;

    // Phone Confirm
    @Column({ type: 'boolean', default: false })
    isPhoneConfirmed: boolean;

    @Column({ type: 'character varying', nullable: true })
    phoneConfirmToken: string | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    phoneConfirmTokenSentAt: Date | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    phoneConfirmTokenExpiredAt: Date | null;

    // Phone Update
    @Column({ type: 'character varying', nullable: true })
    phoneUpdateToken: string | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    phoneUpdateTokenSentAt: Date | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    phoneUpdateTokenExpiredAt: Date | null;

    @Column({ type: 'character varying', nullable: true })
    updatedPhone: string | null;
  }
  return AbstractBase;
}

export default Phone;
