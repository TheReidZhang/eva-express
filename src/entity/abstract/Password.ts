import { BeforeInsert, BeforeUpdate, Check, Column } from 'typeorm';
import { Constructor } from './types';
import bcrypt from 'bcrypt';
import { PASSWORD_LENGTH_MIN } from 'helper/constant';

function Password<TBase extends Constructor>(Base: TBase) {
  @Check(`
  (password_reset_token IS NULL 
    AND password_reset_token_sent_at IS NULL
    AND password_reset_token_expired_at IS NULL) OR
  (password_reset_token IS NOT NULL
    AND password_reset_token_sent_at IS NOT NULL
    AND password_reset_token_expired_at IS NOT NULL)`)
  abstract class AbstractBase extends Base {
    @Column({ type: 'text', unique: true })
    salt: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'character varying', nullable: true, unique: true })
    passwordResetToken: string | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    passwordResetTokenSentAt: Date | null;

    @Column({ type: 'timestamp without time zone', nullable: true })
    passwordResetTokenExpiredAt: Date | null;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      this.salt = bcrypt.genSaltSync(PASSWORD_LENGTH_MIN);
      this.password = bcrypt.hashSync(this.password, this.salt);
    }
  }
  return AbstractBase;
}

export default Password;
