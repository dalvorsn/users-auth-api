import { StatusCodes } from '../constants.js';
import { findUserUseCase } from '../domain/use-cases/index.js';

const makeFindUser = () => async (httpRequest) => {
  const { params: { id } } = httpRequest;
  const { headers: { authorization } } = httpRequest;
  const token = authorization.replace(/^Bearer\s+/, '');

  const user = await findUserUseCase({ id, token });

  const response = {
    statusCode: StatusCodes.OK,
    data: { ...user },
  };

  return response;
};

export default makeFindUser;
