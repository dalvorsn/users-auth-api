import { UnauthorizedError } from '../helpers/error-types.js';

const makeAuth = ({ tokenHandler }) => async (httpRequest) => {
  const { headers: { authorization } } = httpRequest;

  if (!authorization) {
    throw new UnauthorizedError();
  }

  const token = authorization.replace(/^Bearer\s+/, '');
  if (!token) {
    throw new UnauthorizedError();
  }

  try {
    tokenHandler.isValid(token);
  } catch (e) {
    throw new UnauthorizedError();
  }

  return true;
};

export default makeAuth;
