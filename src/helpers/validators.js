/**
 * Based on RFC 5322
 *
 * Access following links for further information.
 *
 * {@link https://emailregex.com|emailregex.com}
 *
 * {@link https://www.ietf.org/rfc/rfc5322.txt|RFC5322}
 */
export const emailValidator = {
  isValid: (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },
};

export const phoneValidator = {
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

const validators = Object.freeze({ emailValidator, phoneValidator });
export default validators;
