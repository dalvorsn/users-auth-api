import {} from '../../../../src/domain/use-cases/index.js';
import makeSignUpUseCase from '../../../../src/domain/use-cases/sign-up.js';
import tokenHandler from '../../../../src/helpers/jwt-token-handler.js';
import hasher from '../../../../src/helpers/bcrypt-hasher.js';
import { ConflictError, BadRequestError } from '../../../../src/helpers/error-types.js';

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

describe('Use Case sign up', () => {
  describe('Success cases', () => {
    it('valid user', async (done) => {
      const usersDb = {
        getByEmail: async () => null,
        insert: async () => validUser,
      };

      const signUpUseCase = makeSignUpUseCase({ tokenHandler, hasher, usersDb });
      await signUpUseCase(validUser);
      done();
    });
  });

  describe('Fail cases', () => {
    it('email already exists', async (done) => {
      const usersDb = {
        getByEmail: async () => validUser,
      };

      const signUpUseCase = makeSignUpUseCase({ tokenHandler, hasher, usersDb });
      expect(signUpUseCase(validUser)).rejects.toThrow(ConflictError);
      done();
    });

    it('missing params', async (done) => {
      const usersDb = {};

      const signUpUseCase = makeSignUpUseCase({ tokenHandler, hasher, usersDb });

      expect(signUpUseCase({})).rejects.toThrow(BadRequestError);
      done();
    });
  });
});
