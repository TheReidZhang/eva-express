'use strict';

// third-party node modules
import bcrypt from 'bcrypt';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

// helpers
import { GENDER, GENDER_LIST, LOCALE, LOCALE_LIST, PASSWORD_LENGTH_MIN, TIMEZONE_LIST } from 'helper/constant';
import Base from './Base';

@Entity()
class User extends Base {
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
  @Column({ type: 'character varying', unique: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  isEmailConfirmed: boolean;

  @Column({ type: 'character varying', nullable: true, unique: true })
  emailConfirmToken: string | null;

  @Column({ type: 'character varying', nullable: true, unique: true })
  emailUpdateToken: string | null;

  @Column({ type: 'timestamp without time zone', nullable: true })
  emailUpdateTokenExpiredAt: Date | null;

  @Column({ type: 'character varying', nullable: true })
  updatedEmail: string | null;

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
