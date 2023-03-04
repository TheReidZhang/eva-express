/**
 * Client Error Service:
 *
 * For Better Client 4xx Error Handling
 */

'use strict';

import { ValidationError } from 'class-validator';
import { ZodError } from 'zod';

/**
 * Global Error Codes
 *
 * Error code object contains one error code and multiple messages.
 * You can choose which message you want to use by passing in the message index to the errorResponse method
 * Add more custom global error codes here
 */
type Error = {
  errorCode: string;
  status: number;
};

const GLOBAL_ERRORS = {
  INVALID_ARGUMENTS: {
    errorCode: 'INVALID_ARGUMENTS',
    status: 400,
  },

  UNAUTHORIZED: {
    errorCode: 'UNAUTHORIZED',
    status: 401,
  },

  INTERNAL_SERVER_ERROR: {
    errorCode: 'INTERNAL_SERVER_ERROR',
    status: 500,
  },

  SERVICE_UNAVAILABLE: {
    errorCode: 'SERVICE_UNAVAILABLE',
    status: 503,
  },

  USER_ALREADY_EXISTS: {
    errorCode: 'USER_ALREADY_EXISTS',
    status: 400,
  },

  INVALID_PHONE_NUMBER: {
    errorCode: 'INVALID_PHONE_NUMBER',
    status: 400,
  },

  INVALID_PASSWORD_FORMAT: {
    errorCode: 'INVALID_PASSWORD_FORMAT',
    status: 400,
  },

  INVALID_LOGIN_CREDENTIALS: {
    errorCode: 'INVALID_LOGIN_CREDENTIALS',
    status: 400,
  },

  INVALID_EMAIL_CONFIRMATION_TOKEN: {
    errorCode: 'INVALID_EMAIL_CONFIRMATION_TOKEN',
    status: 400,
  },

  EMAIL_ALREADY_CONFIRMED: {
    errorCode: 'EMAIL_ALREADY_CONFIRMED',
    status: 400,
  },
};

const ERRORS = {
  ...GLOBAL_ERRORS,
};

export { ERRORS, errorResponse, classValidatorErrorMessage, zodErrorMessage };

function errorResponse(req: any, error, errorMessage?: string) {
  return {
    success: false,
    status: error.status,
    errorCode: error.errorCode,
    message: errorMessage || req.__(error.errorCode),
  };
}

function zodErrorMessage(error: ZodError): string {
  return error.issues.map(({ path, message }) => `${path.join('->')}:${message}`).join(',');
}

function classValidatorErrorMessage(errors: ValidationError[]) {
  return errors.map(error => JSON.stringify(error.constraints)).join(',');
}
