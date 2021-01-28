import { v4, validate } from 'uuid';
import buildMakeUser from './user.js';

const guid = {
  genId: v4,
  isValid: validate,
};

const emailValidator = {
  isValid: (email) => {
    // RFC 5322
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },
};

const phoneValidator = {
  isValid: (phone) => {
    if (!/^\d{2}$/.test(phone.ddd)) {
      return false;
    }

    if (!/^\d{8,9}$/.test(phone.number)) {
      return false;
    }

    return true;
  },
};

const makeUser = buildMakeUser({ guid, emailValidator, phoneValidator });

const entityFactories = Object.freeze({ makeUser });

export default entityFactories;
export { makeUser };
