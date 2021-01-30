import { StatusCodes } from '../constants.js';
import { signInUseCase, toDTO } from '../domain/use-cases/index.js';

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
