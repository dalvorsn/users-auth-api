import makeSignIn from './sign-in.js';
import makeSignUp from './sign-up.js';
import makeFindUser from './find-user.js';

const toDTO = ({
  id, name, email, phones, token, lastLogin, createdAt, updatedAt,
}) => ({
  id,
  name,
  email,
  phones,
  token,
  createdAt: new Date(createdAt).toISOString(),
  updatedAt: new Date(updatedAt).toISOString(),
  lastLogin: new Date(lastLogin).toISOString(),
});

const signInController = makeSignIn({ toDTO });
const signUpController = makeSignUp({ toDTO });
const findUserController = makeFindUser({ toDTO });

const controllers = Object.freeze({
  signInController, signUpController, findUserController, toDTO,
});

export default controllers;
export {
  signInController, signUpController, findUserController, toDTO,
};
