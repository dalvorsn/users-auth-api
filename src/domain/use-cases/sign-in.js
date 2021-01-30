import { UnauthorizedError } from '../../helpers/error-types.js';

const makeSignInUseCase = ({ tokenHandler, hasher, usersDb }) => async ({ email, password }) => {
  const user = await usersDb.getByEmail(email);
  if (!user) {
    throw new UnauthorizedError('Invalid email or password.');
  }

  const credentialsOk = await hasher.verify(password, user.password);

  if (!credentialsOk) {
    throw new UnauthorizedError('Invalid email or password.');
  }

  user.lastLogin = Date.now();
  user.token = await tokenHandler.encode({ id: user.id, email });

  const updatedUser = await usersDb.update(user);
  return updatedUser;
};

export default makeSignInUseCase;
