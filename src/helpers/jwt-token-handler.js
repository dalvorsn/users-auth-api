import jwt from 'jsonwebtoken';
import config from '../config.js';

const { token: { secret, expireTime } } = config;
const {
  decode: jwtDecode, verify, sign, TokenExpiredError,
} = jwt;

const isTokenExpiredError = (error) => error instanceof TokenExpiredError;
const isValid = (token) => verify(token, secret);
const decode = (token) => jwtDecode(token);
const encode = (data) => sign(data, secret, { expiresIn: expireTime });

const tokenHandler = {
  isTokenExpiredError,
  isValid,
  decode,
  encode,
};

export default Object.freeze(tokenHandler);
