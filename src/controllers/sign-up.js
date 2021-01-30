import { signUpUseCase } from '../domain/use-cases/index.js';
import { StatusCodes } from '../constants.js';

const toDTO = ({
  id, name, email, phones, token, lastLogin, createdAt, updatedAt,
}) => ({
  id,
  name,
  email,
  phones,
  token,
  createdAt: new Date(createdAt).toISOString(),
  updatedAt: new Date(updatedAt).toISOString(),
  lastLogin: new Date(lastLogin).toISOString(),
});

const makeSignUp = () => async (httpRequest) => {
  const {
    body: {
      name, email, password, phones,
    },
  } = httpRequest;

  const data = await signUpUseCase({
    name, email, password, phones,
  });

  const response = {
    statusCode: StatusCodes.CREATED,
    data: toDTO(data),
  };

  return response;
};

export default makeSignUp;
