import { v4, validate } from 'uuid';

const guid = Object.freeze({
  genId: v4,
  isValid: validate,
});

export default guid;
