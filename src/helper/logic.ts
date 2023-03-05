import crypto from 'crypto';

export { randomString, generateToken, removeAllWhiteSpace };

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

function generateToken(len = 64) {
  return crypto.randomBytes(len).toString('hex');
}

function removeAllWhiteSpace(str: string) {
  return str.replace(/ /g, '').replace(/\n/g, '').replace(/\t/g, '');
}
