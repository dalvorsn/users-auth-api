import { makeUser } from '../entities/index.js';
import { ConflictError, BadRequestError } from '../../helpers/error-types.js';

const makeSignUpUseCase = ({ tokenHandler, hasher, usersDb }) => async ({
  name, email, password, phones,
}) => {
  let user;
  try {
    user = makeUser({
      name, email, password, phones,
    });
  } catch (error) {
    throw new BadRequestError(error.message);
  }

  if (await usersDb.getByEmail(email) !== null) {
    throw new ConflictError('User with this email already exists.');
  }

  user.lastLogin = new Date();
  user.token = tokenHandler.encode({ id: user.id, email });
  user.password = await hasher.encrypt(password);

  const insertUser = await usersDb.insert(user);
  return insertUser;
};

export default makeSignUpUseCase;
