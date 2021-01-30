import { StatusCodes } from '../constants.js';
import { signInUseCase } from '../domain/use-cases/index.js';

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

const makeSignIn = () => async (httpRequest) => {
  const { body: { email, password } } = httpRequest;
  const data = await signInUseCase({ email, password });

  const response = {
    statusCode: StatusCodes.OK,
    data: toDTO(data),
  };

  return response;
};

export default makeSignIn;
