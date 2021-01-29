import jwt from 'jsonwebtoken';
import config from '../config.js';

const { token: { secret, expireTime } } = config;
const { decode, verify, sign } = jwt;

const tokenHandler = {
  isValid: (token) => verify(token, secret),
  decode: (token) => decode(token),
  encode: (data) => sign(data, secret, { expiresIn: expireTime }),
};

export default Object.freeze(tokenHandler);
