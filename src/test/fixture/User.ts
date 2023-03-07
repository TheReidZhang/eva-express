import _ from 'lodash';
import { GENDER, LOCALE } from 'helper/constant';

const Users = [
  {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,

    email: 'thereidzhang@gmail.com',
    isEmailConfirmed: true,
    emailConfirmToken: 'token-1',
    emailConfirmTokenSentAt: new Date(),
    emailUpdateToken: 'token-1',
    emailUpdateTokenSentAt: new Date(),
    emailUpdateTokenExpiredAt: new Date(),
    updatedEmail: 'newemail@email.com',

    phone: '+12404840984',
    isPhoneConfirmed: true,
    phoneConfirmToken: 'token-1',
    phoneConfirmTokenSentAt: new Date(),
    phoneConfirmTokenExpiredAt: new Date(),
    phoneUpdateToken: 'token-1',
    phoneUpdateTokenSentAt: new Date(),
    phoneUpdateTokenExpiredAt: new Date(),
    updatedPhone: '+12404840984',

    salt: '1-TYIUJHGIUYGDJHGAIHGKDCHJAGKSHJDGFKGHHGEK1',
    password: 'password1F%$',
    passwordResetToken: null,
    passwordResetTokenSentAt: null,
    passwordResetTokenExpiredAt: null,

    firstName: 'Reid',
    lastName: 'Zhang',
    gender: GENDER.MALE,
    timezone: 'America/New_York',
    locale: LOCALE.EN,
    loginCount: 0,
    lastLoginAt: null,
  },
];

export default () => _.cloneDeep(Users);
