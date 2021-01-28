import { makeUser } from '../../../../src/domain/entities/index.js';

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

describe('Entity User', () => {
  describe('Success cases', () => {
    it('makeUser valid', async (done) => {
      const userData = { ...validUser };

      const user = makeUser(userData);
      expect(user.id !== '').toBe(true);
      expect(user.email).toBe(userData.email);
      expect(user.phones).toMatchObject(userData.phones);
      done();
    });
  });

  describe('Error cases', () => {
    it('invalid password', (done) => {
      const userData = { ...validUser };
      userData.password = '333';

      expect(() => makeUser(userData)).toThrow(Error);
      done();
    });

    it('invalid guid', (done) => {
      const userData = { ...validUser };
      userData.id = 'xxx';

      expect(() => makeUser(userData)).toThrow(Error);
      done();
    });

    it('invalid email', (done) => {
      const userData = { ...validUser };
      userData.email = 'a_a.b';

      expect(() => makeUser(userData)).toThrow(Error);
      done();
    });

    it('invalid name', (done) => {
      const userData = { ...validUser };
      userData.name = 'an';

      expect(() => makeUser(userData)).toThrow(Error);
      done();
    });

    it('invalid phone ddd', (done) => {
      const userData = { ...validUser };
      userData.phones = [
        {
          ddd: '1',
          number: '99999999',
        },
      ];

      expect(() => makeUser(userData)).toThrow(Error);
      done();
    });

    it('invalid phone number', (done) => {
      const userData = { ...validUser };
      userData.phones = [
        {
          ddd: '11',
          number: '999999',
        },
      ];

      expect(() => makeUser(userData)).toThrow(Error);
      done();
    });

    it('invalid phone type', (done) => {
      const userData = { ...validUser };
      userData.phones = [
        {
          ddd: {},
          number: '999999',
        },
      ];

      expect(() => makeUser(userData)).toThrow(Error);
      done();
    });
  });
});
