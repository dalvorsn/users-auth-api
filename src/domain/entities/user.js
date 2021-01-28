const buildMakeUser = ({ guid, emailValidator, phoneValidator }) => {
  const makeUser = ({
    id = guid.genId(),
    createdAt = Date.now(),
    updatedAt = Date.now(),
    name,
    email,
    password,
    phones,
    token,
    lastLogin,
  }) => {
    if (!guid.isValid(id)) {
      throw Error('Invalid id.');
    }

    if (!name || name.length < 3 || name.length > 255) {
      throw Error('Invalid or missing name.');
    }

    if (!email || !emailValidator.isValid(email)) {
      throw Error('Invalid email.');
    }

    if (!password || password.length < 6) {
      throw Error('Missing password or invalid');
    }

    if (phones && Array.isArray(phones) && !phones.every(phoneValidator.isValid)) {
      throw Error('Invalid phones.');
    }

    return Object.seal({
      id, name, email, password, phones, token, lastLogin, createdAt, updatedAt,
    });
  };

  return makeUser;
};

export default buildMakeUser;
