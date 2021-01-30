import { UnauthorizedError } from '../helpers/error-types.js';

const makeAuth = ({ tokenHandler }) => async (httpRequest) => {
  const { headers: { authorization } } = httpRequest;

  if (!authorization) {
    throw new UnauthorizedError('Access token is missing or invalid.');
  }

  const token = authorization.replace(/^Bearer\s+/, '');
  if (!token) {
    throw new UnauthorizedError('Access token is missing or invalid.');
  }

  try {
    tokenHandler.isValid(token);
  } catch (e) {
    throw new UnauthorizedError('Access token is missing or invalid.');
  }

  return true;
};

export default makeAuth;
