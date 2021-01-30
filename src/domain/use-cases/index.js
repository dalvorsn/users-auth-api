import makeSignUpUseCase from './sign-up.js';
import makeSignInUseCase from './sign-in.js';
import { usersDb } from '../../data/index.js';
import tokenHandler from '../../helpers/jwt-token-handler.js';
import hasher from '../../helpers/bcrypt-hasher.js';

const signUpUseCase = makeSignUpUseCase({ tokenHandler, hasher, usersDb });
const signInUseCase = makeSignInUseCase({ tokenHandler, hasher, usersDb });

const useCases = Object.freeze({ signUpUseCase, signInUseCase });

export { signUpUseCase, signInUseCase };
export default useCases;
