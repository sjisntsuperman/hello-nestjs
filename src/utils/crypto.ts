import * as crypto from 'crypto';

export function makeSalt(): string {
  return crypto.randomBytes(3).toString();
}

export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }

  const temp = Buffer.from(salt, 'base64');
  // 10000 代表迭代次数 16表长度
  return crypto
    .pbkdf2Sync(password, temp, 10000, 16, 'sha1')
    .toString('base64');
}
