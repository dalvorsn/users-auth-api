import { StatusCodes } from '../constants.js';
import {
  BadRequestError, UnauthorizedError, InternalServerError, ResourceNotFoundError,
} from '../helpers/error-types.js';

const errorCodes = [
  { statusCode: StatusCodes.BAD_REQUEST, class: BadRequestError },
  { statusCode: StatusCodes.UNAUTHORIZED, class: UnauthorizedError },
  { statusCode: StatusCodes.NOT_FOUND, class: ResourceNotFoundError },
  { statusCode: StatusCodes.INTERNAL_SERVER_ERROR, class: InternalServerError },
];

const errorHandler = (error) => {
  const message = error.message || 'An uknow error has occurred.';
  const code = errorCodes.find((e) => error instanceof e.class);
  const statusCode = code ? code.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;

  return {
    statusCode, message,
  };
};

export default errorHandler;
