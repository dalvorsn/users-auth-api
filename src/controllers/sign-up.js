import { StatusCodes } from '../constants.js';
import { signUpUseCase } from '../domain/use-cases/index.js';

const makeSignUp = ({ toDTO }) => async (httpRequest) => {
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
