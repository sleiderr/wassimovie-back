import crypto from 'crypto';

export const hashPassword = function (password) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}