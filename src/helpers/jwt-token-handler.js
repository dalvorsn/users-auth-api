import jwt from 'jsonwebtoken';
import config from '../config.js';
import { UnauthorizedError } from './error-types.js';

const { token: { secret, expireTime } } = config;
const {
  decode: jwtDecode, verify, sign, TokenExpiredError,
} = jwt;

const isValid = (token) => {
  try {
    verify(token, secret);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError('Session expired.');
    }

    throw new UnauthorizedError('Invalid or missing token.');
  }
};
const decode = (token) => jwtDecode(token);
const encode = (data) => sign(data, secret, { expiresIn: expireTime });

const tokenHandler = Object.freeze({
  isValid,
  decode,
  encode,
});

export default tokenHandler;
