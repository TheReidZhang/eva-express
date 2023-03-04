/**
 * All global constant variables in this file
 * !IMPORTANT: All variables must be in UPPER CASE with underscores
 *
 * !IMPORTANT: For Arrays and Objects
 * - Use Plural word to represent an Array. e.g. LANGUAGE_LIST
 * - Use Singular word to reprent an Object. e.g. LANGUAGE
 *                    OR
 * - Append key name with "_ARR" to represent an Array. e.g. LANGUAGE_ARR
 * - Append key name with "_OBJ" to represent an Object. e.g. LANGUAGE_OBJ
 */

'use strict';

import moment from 'moment-timezone';

enum LOCALE {
  EN = 'en',
}
const LOCALE_LIST = Object.values(LOCALE);
enum LANGUAGE {
  ENGLISH = 'ENGLISH',
}
const LANGUAGE_LIST = Object.values(LOCALE);
const TIMEZONE_LIST = moment.tz.names();
const TIMEZONE = [...TIMEZONE_LIST] as const;
const PASSWORD_LENGTH_MIN = 8; // minimum of 8 characters for passwords
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/; // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
const SUBDOMAIN_REGEX = /^[a-zA-Z0-9]+[a-zA-Z0-9-_]*[[a-zA-Z0-9]+$|^[a-zA-Z0-9]*[a-zA-Z0-9]+$/;
// Genders
enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
// ACCOUNT TYPE
enum AUTHENTICATION_TYPE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
const GENDER_LIST = Object.values(GENDER);
export {
  LOCALE,
  LOCALE_LIST,
  LANGUAGE,
  LANGUAGE_LIST,
  TIMEZONE_LIST,
  TIMEZONE,
  PASSWORD_LENGTH_MIN,
  PASSWORD_REGEX,
  SUBDOMAIN_REGEX,
  GENDER,
  GENDER_LIST,
  AUTHENTICATION_TYPE,
};

// Organizations
export enum ORGANIZATION_TYPE {
  PUBLIC_COMPANY = 'PUBLIC_COMPANY',
  SELF_EMPLOYED = 'SELF-EMPLOYED',
  GOVERNMENT_AGENCY = 'GOVERNMENT_AGENCY',
  NONPROFIT = 'NONPROFIT',
  SOLE_PROPRIETORSHIP = 'SOLE_PROPRIETORSHIP',
  PRIVATELY_HELD = 'PRIVATELY_HELD',
  PARTNERSHIP = 'PARTNERSHIP',
}
export const ORGANIZATION_TYPE_LIST = Object.values(ORGANIZATION_TYPE);
export enum ORGANIZATION_SIZE {
  '0-1_EMPLOYEE' = '0-1_EMPLOYEE',
  '2-10_EMPLOYEES' = '2-10_EMPLOYEES',
  '11-50_EMPLOYEES' = '11-50_EMPLOYEES',
  '51-200_EMPLOYEES' = '51-200_EMPLOYEES',
  '201-500_EMPLOYEES' = '201-500_EMPLOYEES',
  '501-1000_EMPLOYEES' = '501-1000_EMPLOYEES',
  '1001-5000_EMPLOYEES' = '1001-5000_EMPLOYEES',
  '5001-10000_EMPLOYEES' = '5001-10000_EMPLOYEES',
  '10000+_EMPLOYEES' = '10000+_EMPLOYEES',
}
export const ORGANIZATION_SIZE_LIST = Object.values(ORGANIZATION_SIZE);

// Links
export enum FEATURE_TYPE {
  LINK = 'LINK',
  CONTACT_FORM = 'CONTACT_FORM',
  HEADER = 'HEADER',
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  BOOK_LIST = 'BOOK_LIST',
  IMAGE = 'IMAGE',
}
export const FEATURE_TYPE_LIST = Object.values(FEATURE_TYPE);

export enum FEATURE_SIGN_S3_TYPE {
  LINK = 'LINK',
  PDF = 'PDF',
}
export const FEATURE_SIGN_S3_TYPE_LIST = Object.values(FEATURE_SIGN_S3_TYPE);

export enum USER_SIGN_S3_TYPE {
  AVATAR = 'AVATAR',
}
export const USER_SIGN_S3_TYPE_LIST = Object.values(USER_SIGN_S3_TYPE);

export enum ORGANIZATION_SIGN_S3_TYPE {
  AVATAR = 'AVATAR',
}
export const ORGANIZATION_SIGN_S3_TYPE_LIST = Object.values(ORGANIZATION_SIGN_S3_TYPE);

// Passport Strategy Provider
export enum PASSPORT_STRATEGY_PROVIDER {
  JUJU = 'JuJu',
  LINKEDIN = 'linkedin',
}
export const PASSPORT_STRATEGY_PROVIDER_LIST = Object.values(PASSPORT_STRATEGY_PROVIDER);

export const AUTHENTICATION_TYPE_LIST = Object.values(AUTHENTICATION_TYPE);

// LIST
export const LIST_INT_REGEX_EMPTY = /^$|^\d+([,]\d+)*$/; // regex for a list integer 1,2,3,456,78 or ''

export enum IMAGE_CONTENT_TYPE {
  GIF = 'image/gif',
  PNG = 'image/png',
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
  SVG = 'image/svg',
  'SVG+XML' = 'image/svg+xml',
}
export const IMAGE_CONTENT_TYPE_LIST = Object.values(IMAGE_CONTENT_TYPE);
export const PDF_CONTENT_TYPE_LIST = ['application/pdf'];

// Rakuten Affiliate Related
export enum RAKUTEN_SORT_FIELD {
  'retailprice' = 'retailprice',
  'productname' = 'productname',
  'shortdesp' = 'shortdesp',
  'categoryname' = 'categoryname',
  'mid' = 'mid',
  'keyword' = 'keyword',
}
export const RAKUTEN_SORT_FIELD_LIST = Object.values(RAKUTEN_SORT_FIELD);

export enum RAKUTEN_SORT_TYPE {
  'asc' = 'asc',
  'dsc' = 'dsc',
}
export const RAKUTEN_SORT_TYLE_LIST = Object.values(RAKUTEN_SORT_TYPE);

export enum RECOMMENDATION_MEDIA_TYPE {
  'VIDEO' = 'VIDEO',
  'IMAGE' = 'IMAGE',
}

export const RECOMMENDATION_MEDIA_TYPE_LIST = Object.values(RECOMMENDATION_MEDIA_TYPE);

export enum RECOMMENDATION_MEDIA_PROVIDER {
  'LOCAL' = 'LOCAL',
  'INSTAGRAM' = 'INSTAGRAM',
}

export const RECOMMENDATION_MEDIA_PROVIDER_LIST = Object.values(RECOMMENDATION_MEDIA_PROVIDER);

// export enum TIMEZONE {}

// module.exports = {
//   // Languages & Locales
//   LOCALE: { en: 'en' },
//   LOCALE_LIST: ['en'], // first index is the default language
//   LANGUAGE: { ENGLISH: 'English' },
//   LANGUAGE_LIST: ['English'], //the languages in english

//   // moment.js formats
//   DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
//   DATE_TIME_FORMAT_Z: 'YYYY-MM-DD HH:mm:ss z',
//   DATE_FORMAT: 'YYYY-MM-DD',
//   TIME_FORMAT: 'HH:mm:ss',

//   // Days
//   DAYS_FULL: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
//   DAYS_HALF: ['MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'],
//   DAYS_SHORT: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
//   DAYS_SINGLE: ['M', 'TU', 'W', 'TH', 'F', 'SA', 'SU'],

//   // Regex for joi validations
//   TIME_REGEX: /^(([0-1][0-9])|([2][0-3])):([0-5][0-9])$/, //regex for time 00:00
//   LIST_INT_REGEX: /^\d+([,]\d+)*$/, // regex for a list integer 1,2,3,456,78
//   LIST_INT_REGEX_EMPTY: /^$|^\d+([,]\d+)*$/, // regex for a list integer 1,2,3,456,78 or ''
//   LIST_STRING_REGEX: /^(\w|\s|&|\/)+([,](\w|\s|&|\/)+)*$/, // regex for a list string 1,2,3,456,78
//   LIST_STRING_REGEX_EMPTY: /^$|^(\w|\s)+([,](\w|\s)+)*$/, // regex for a list string 1,2,3,456,78 or ''
//   LIST_STRING_AT_REGEX_EMPTY: /^$|^(\w|\s|@|\.)+([,](\w|\s|@|\.)+)*$/, // regex for a list string 1,2,3,456,@78 or ''

//   // Passwords: For PCI Compliance
//   PASSWORD_LENGTH_MIN: 10, // minimum of 10 characters for passwords
//   PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,})/, // Password must contain at least 1 lowercase alphabetical character, at least 1 uppercase alphabetical character, at least 1 numeric character, at least one special character, and must be at least 10 characters in length.

//   // Genders
//   GENDER: { MALE: 'MALE', FEMALE: 'FEMALE', OTHER: 'OTHER' },
//   GENDER_LIST: ['MALE', 'FEMALE', 'OTHER'],

//   // Product Types
//   PRODUCT_TYPE: { COMBO: 'COMBO', REGULAR: 'REGULAR' },
//   PRODUCT_TYPES: ['COMBO', 'REGULAR'],

//   // Product Availability (available times)
//   PRODUCT_AVAILABILITY_TYPE: { LUNCH: 'LUNCH', DINNER: 'DINNER' },
//   PRODUCT_AVAILABILITY_TYPE_LIST: ['LUNCH', 'DINNER'],

//   // Food Order Status
//   FOOD_ORDER_STATUS: {
//     NEW: 'NEW',
//     CONFIRMED: 'CONFIRMED',
//     PAID: 'PAID',
//     COMPLETE: 'COMPLETE',
//     CANCELLED: 'CANCELLED',
//     FAILED: 'FAILED',
//   },
//   FOOD_ORDER_STATUS_LIST: ['NEW', 'CONFIRMED', 'PAID', 'COMPLETE', 'CANCELLED', 'FAILED'],

//   // Food Route
//   FOOD_ROUTE_STOP_TYPE: { RESTAURANT: 'RESTAURANT', LOCATION: 'LOCATION' },
//   FOOD_ROUTE_STOP_TYPE_LIST: ['RESTAURANT', 'LOCATION'],

//   // FOOD Route Config
//   FOOD_ROUTE_CONFIG_RECURRING_TYPE: { DAILY: 'DAILY', WEEKLY: 'WEEKLY', MONTHLY: 'MONTHLY' },

//   // Food Order Feedback Reason
//   FOOD_ORDER_FEEDBACK_REASON: {
//     FOREIGN_OBJECT: 'FOREIGN_OBJECT',
//     ALLERGIC_INGREDIENT: 'ALLERGIC_INGREDIENT',
//     WRONG_MENU_ITEM: 'WRONG_MENU_ITEM',
//     UNSATISFACTORY_COOKING: 'UNSATISFACTORY_COOKING',
//     FRAUD_DESCRIPTION: 'FRAUD_DESCRIPTION',
//     OTHER: 'OTHER',
//   },
//   FOOD_ORDER_FEEDBACK_REASON_LIST: [
//     'FOREIGN_OBJECT',
//     'ALLERGIC_INGREDIENT',
//     'WRONG_MENU_ITEM',
//     'UNSATISFACTORY_COOKING',
//     'FRAUD_DESCRIPTION',
//     'OTHER',
//   ],
//   FOOD_ROUTE_CONFIG_RECURRING_TYPE_LIST: ['DAILY', 'WEEKLY', 'MONTHLY'],

//   // Food Coupon Types
//   FOOD_COUPON_TYPES: { REBATE: 'REBATE', CERTAIN_AMOUNT: 'CERTAIN_AMOUNT', PERCENTAGE: 'PERCENTAGE' },
//   FOOD_COUPON_TYPES_LIST: ['REBATE', 'CERTAIN_AMOUNT', 'PERCENTAGE'],

//   // Food Partner Roles
//   FOOD_PARTNER_ROLE: { ADMIN: 'ADMIN', MANAGER: 'MANAGER', STAFF: 'STAFF' },
//   FOOD_PARTNER_ROLE_LIST: ['ADMIN', 'MANAGER', 'STAFF'],
// };
