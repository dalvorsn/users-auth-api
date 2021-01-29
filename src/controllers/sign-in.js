import { StatusCodes } from '../constants.js';

// mock use case
const signInUseCase = async () => {};

const makeSignIn = ({ hasher }) => async (httpRequest) => {
  const { body: { email, password } } = httpRequest;
  const hash = await hasher.encrypt(password);
  const data = await signInUseCase({ email, password: hash });

  const response = {
    statusCode: StatusCodes.OK,
    data,
  };

  return response;
};

export default makeSignIn;
