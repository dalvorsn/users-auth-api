import { StatusCodes } from '../constants.js';

// mock use case
const signUpUseCase = async () => {};

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
    data,
  };

  return response;
};

export default makeSignUp;
