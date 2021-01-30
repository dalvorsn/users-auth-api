import {} from '../../../../src/domain/use-cases/index.js';
import makeSignInUseCase from '../../../../src/domain/use-cases/sign-in.js';
import tokenHandler from '../../../../src/helpers/jwt-token-handler.js';
import hasher from '../../../../src/helpers/bcrypt-hasher.js';
import { UnauthorizedError } from '../../../../src/helpers/error-types.js';

const validUser = {
  name: 'Jorge',
  email: 'jorge@bol.com',
  password: 'hardpassword',
  phones: [
    {
      ddd: '32',
      number: '32134555',
    },
  ],
};

describe('Use Case sign in', () => {
  describe('Success cases', () => {
    it('valid credentials', async (done) => {
      const user = { ...validUser };
      user.password = await hasher.encrypt(user.password);

      const usersDb = {
        getByEmail: async () => user,
        update: async () => user,
      };

      const { email, password } = validUser;
      const signInUseCase = makeSignInUseCase({ tokenHandler, hasher, usersDb });
      await expect(signInUseCase({ email, password })).resolves.toBe(user);
      done();
    });
  });

  describe('Fail cases', () => {
    it('user not found', async (done) => {
      const usersDb = {
        getByEmail: async () => null,
      };

      const SignInUseCase = makeSignInUseCase({ tokenHandler, hasher, usersDb });
      await expect(SignInUseCase(validUser)).rejects.toThrow(UnauthorizedError);
      done();
    });

    it('invalid password', async (done) => {
      const usersDb = {
        getByEmail: async () => validUser,
      };

      const password = 'randomPassword';
      const { email } = validUser;
      const SignInUseCase = makeSignInUseCase({ tokenHandler, hasher, usersDb });

      await expect(SignInUseCase({ email, password })).rejects.toThrow(UnauthorizedError);
      done();
    });
  });
});
