import makeFindUserUseCase from '../../../../src/domain/use-cases/find-user.js';
import tokenHandler from '../../../../src/helpers/jwt-token-handler.js';
import { ResourceNotFoundError, UnauthorizedError } from '../../../../src/helpers/error-types.js';

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

describe('Find user', () => {
  describe('Success cases', () => {
    it('valid token and valid id', async (done) => {
      const token = tokenHandler.encode({});
      const id = 'id';

      const user = { ...validUser };
      user.token = token;

      const usersDb = {
        getById: async () => user,
      };

      const findUserUseCase = makeFindUserUseCase({ expireTime: 30 * 60, usersDb });
      const promise = findUserUseCase({ id, token });
      await expect(promise).resolves.toBe(user);
      done();
    });
  });

  describe('Fail cases', () => {
    it('user not found', async (done) => {
      const id = 'id';
      const token = 'token';

      const usersDb = {
        getById: async () => null,
      };

      const findUserUseCase = makeFindUserUseCase({ expireTime: 30 * 60, usersDb });
      const promise = findUserUseCase({ id, token });
      await expect(promise).rejects.toThrow(ResourceNotFoundError);
      done();
    });
    it('token mismatch', async (done) => {
      const id = 'id';
      const token = 'token';

      const user = { ...validUser };
      user.token = 'mismatchtoken';

      const usersDb = {
        getById: async () => user,
      };

      const findUserUseCase = makeFindUserUseCase({ expireTime: 30 * 60, usersDb });

      const promise = findUserUseCase({ id, token });
      await expect(promise).rejects.toThrow(UnauthorizedError);
      done();
    });
    it('session expired', async (done) => {
      const id = 'id';
      const token = 'token';

      const user = { ...validUser };
      user.token = token;
      user.lastLogin = Date.now() - 31 * 60 * 1000;

      const usersDb = {
        getById: async () => user,
      };

      const findUserUseCase = makeFindUserUseCase({ expireTime: 30 * 60, usersDb });
      const promise = findUserUseCase({ id, token });
      await expect(promise).rejects.toThrow(UnauthorizedError);
      done();
    });
  });
});
