'use strict';

// third-party node modules
import bcrypt from 'bcrypt';
import { Mixin } from 'ts-mixer';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

// helpers
import { GENDER, GENDER_LIST, LOCALE, LOCALE_LIST, PASSWORD_LENGTH_MIN, TIMEZONE_LIST } from 'helper/constant';
import Base from 'entity/abstract/Base';
import Email from 'entity/abstract/Email';

@Entity()
class User extends Email(Base) {
  @Column({ type: 'character varying' })
  firstName: string;

  @Column({ type: 'character varying' })
  lastName: string;

  @Column({ type: 'enum', enum: GENDER_LIST })
  gender: GENDER;

  @Column({ type: 'enum', default: 'America/New_York', enum: TIMEZONE_LIST })
  timezone: string;

  @Column({ type: 'enum', default: LOCALE.EN, enum: LOCALE_LIST })
  locale: LOCALE;

  @Column({ type: 'integer', default: 0 })
  loginCount: number;

  @Column({ type: 'timestamp without time zone', nullable: true })
  lastLoginAt: Date | null;

  // EMAIL

  // PHONE
  @Column({ type: 'character varying', nullable: true })
  phone: string | null;

  @Column({ type: 'boolean', default: false })
  isPhoneConfirmed: boolean;

  @Column({ type: 'character varying', nullable: true, unique: true })
  phoneConfirmToken: string | null;

  @Column({ type: 'timestamp without time zone', nullable: true })
  phoneConfirmTokenLastSentAt: Date | null;

  @Column({ type: 'timestamp without time zone', nullable: true })
  phoneConfirmTokenExpiredAt: Date | null;

  // PASSWORD
  @Column({ type: 'text', unique: true })
  salt: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'character varying', nullable: true, unique: true })
  passwordResetToken: string | null;

  @Column({ type: 'timestamp without time zone', nullable: true })
  passwordResetTokenExpiredAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.salt = bcrypt.genSaltSync(PASSWORD_LENGTH_MIN);
    this.password = bcrypt.hashSync(this.password, this.salt);
  }
}

export default User;
