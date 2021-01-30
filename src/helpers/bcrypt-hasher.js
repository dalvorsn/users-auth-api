import { hash, compare } from 'bcrypt';

const salt = 10;

const hasher = Object.freeze({
  encrypt: (password) => hash(password, salt),
  verify: (password, passwordHash) => compare(password, passwordHash),
});

export default hasher;
