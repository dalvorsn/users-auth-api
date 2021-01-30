import makeSignUpUseCase from './sign-up.js';
import makeSignInUseCase from './sign-in.js';
import makeFindUserUseCase from './find-user.js';
import { usersDb } from '../../data/index.js';
import tokenHandler from '../../helpers/jwt-token-handler.js';
import hasher from '../../helpers/bcrypt-hasher.js';
import config from '../../config.js';

const { token: { expireTime } } = config;

const signUpUseCase = makeSignUpUseCase({ tokenHandler, hasher, usersDb });
const signInUseCase = makeSignInUseCase({ tokenHandler, hasher, usersDb });
const findUserUseCase = makeFindUserUseCase({ expireTime, usersDb });

const useCases = Object.freeze({ signUpUseCase, signInUseCase, findUserUseCase });

export { signUpUseCase, signInUseCase, findUserUseCase };
export default useCases;
