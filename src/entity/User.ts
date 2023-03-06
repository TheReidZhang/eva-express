'use strict';

// third-party node modules
import bcrypt from 'bcrypt';
import { Mixin } from 'ts-mixer';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

// helpers
import { GENDER, GENDER_LIST, LOCALE, LOCALE_LIST, PASSWORD_LENGTH_MIN, TIMEZONE_LIST } from 'helper/constant';
import Base from 'entity/abstract/Base';
import Email from 'entity/abstract/Email';
import Phone from 'entity/abstract/Phone';
import Password from 'entity/abstract/Password';

@Entity()
class User extends Password(Phone(Email(Base))) {
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
}

export default User;
