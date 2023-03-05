/**
 * All logic helper functions
 */

'use strict';

// ENV variables
const { SESSION_SECRET, HOST, HOSTNAME } = process.env;

// require third-party node modules
import jwt from 'jwt-simple';
import crypto from 'crypto';
import User from 'entity/User';

export { getDomainName, randomString, generateToken, createJwtToken, removeAllWhiteSpace };

function getDomainName() {
  const hostUrl = new URL(HOST);
  return hostUrl.hostname.replace(/^[^.]+\./g, '');
}

function randomString(
  { len, pre, post, lowercase, uppercase, numbers, special } = {
    len: 64,
    pre: '',
    post: '',
    lowercase: true,
    uppercase: true,
    numbers: true,
    special: false,
  }
) {
  const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const numberCharacters = '0123456789';
  const specialCharacters = '!$/%@#';

  let characters = '';
  let text = ''; // the random string

  // assemble what characters can be used
  if (lowercase) characters += lowercaseCharacters;
  if (uppercase) characters += uppercaseCharacters;
  if (numbers) characters += numberCharacters;
  if (special) characters += specialCharacters;

  // generate random values - Deprecated Math.random since it is not safe
  const randomValues = new Uint32Array(len);
  crypto.randomFillSync(randomValues);

  // generate random text
  for (const randomValue of randomValues) text += characters.charAt(randomValue % characters.length);

  return pre + text + post;
}

/**
 * Return a url safe random string (served as token)
 */
function generateToken(len = 64) {
  return crypto.randomBytes(len).toString('hex');
}

function createJwtToken(user: User, client: string) {
  // const hours = 6;
  return jwt.encode(
    {
      sub: user.id,
      iss: HOSTNAME,
      aud: client,
      iat: new Date().getTime(),
      // exp: Math.round(Date.now() / 1000 + hours * 60 * 60), // token expires in 6 hours
    },
    SESSION_SECRET
  );
}

/**
 * Removes all white space, tabs and newlines in a string
 *
 * @str (STRING - REQUIRED): String to remove white space from
 *
 * return new string with all white spaces removed
 */
function removeAllWhiteSpace(str: string) {
  return str.replace(/ /g, '').replace(/\n/g, '').replace(/\t/g, '');
}
