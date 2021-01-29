import { hash, compare } from 'bcrypt';

const salt = 10;

const hasher = {
  encrypt: (password) => hash(password, salt),
  verify: (password, passwordHash) => compare(password, passwordHash),
};

export default Object.freeze(hasher);
