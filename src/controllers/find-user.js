import { StatusCodes } from '../constants.js';
import { ResourceNotFoundError, UnauthorizedError } from '../helpers/error-types.js';
// mock use case
const findUserUseCase = async () => {};

const makeFindUser = () => async (httpRequest) => {
  const { params: { id } } = httpRequest;
  const user = await findUserUseCase({ id });

  if (!user) {
    throw new ResourceNotFoundError();
  }

  const { headers: { authorization } } = httpRequest;
  const { token } = user;
  const requestToken = authorization.replace(/^Bearer\s+/, '');
  if (token !== requestToken) {
    throw UnauthorizedError();
  }

  delete user.password;

  const response = {
    statusCode: StatusCodes.OK,
    user,
  };

  return response;
};

export default makeFindUser;
