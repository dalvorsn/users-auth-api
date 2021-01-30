import { ResourceNotFoundError, UnauthorizedError } from '../../helpers/error-types.js';

const makeFindUserUseCase = ({ expireTime, usersDb }) => async ({ id, token: requestToken }) => {
  const user = await usersDb.getById(id);
  if (!user) {
    throw new ResourceNotFoundError();
  }

  const { token, lastLogin } = user;
  if (token !== requestToken) {
    throw new UnauthorizedError('Invalid token.');
  }

  const secondsFromLastLogin = (Date.now() - lastLogin) / (1000);
  if (secondsFromLastLogin > expireTime) {
    throw new UnauthorizedError('Session expired.');
  }

  return user;
};

export default makeFindUserUseCase;
