import { UnauthorizedError } from '../helpers/error-types.js';

const makeAuth = ({ tokenHandler }) => async (httpRequest) => {
  const { headers: { authorization } } = httpRequest;
  let errorMessage = 'Access token is missing or invalid.';
  if (!authorization) {
    throw new UnauthorizedError(errorMessage);
  }

  const token = authorization.replace(/^Bearer\s+/, '');
  if (!token) {
    throw new UnauthorizedError(errorMessage);
  }

  try {
    tokenHandler.isValid(token);
  } catch (e) {
    if (tokenHandler.isTokenExpiredError(e)) {
      errorMessage = 'Session expired.';
    }

    throw new UnauthorizedError(errorMessage);
  }

  return true;
};

export default makeAuth;
