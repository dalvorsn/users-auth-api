import tokenHandler from '../helpers/jwt-token-handler.js';
import makeAuth from './auth.js';
import makeSignIn from './sign-in.js';
import makeSignUp from './sign-up.js';
import makeFindUser from './find-user.js';

const authController = makeAuth({ tokenHandler });
const signInController = makeSignIn();
const signUpController = makeSignUp();
const findUserController = makeFindUser();

const controllers = Object.freeze({
  authController, signInController, signUpController, findUserController,
});

export default controllers;
export {
  authController, signInController, signUpController, findUserController,
};
