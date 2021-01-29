/* eslint-disable max-classes-per-file */
class InternalServerError extends Error {
  constructor(message = 'Internal server error.') {
    super(message);
  }
}

class BadRequestError extends Error {
  constructor(message = 'Bad request.') {
    super(message);
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized.') {
    super(message);
  }
}

class ResourceNotFoundError extends Error {
  constructor(message = 'Resource not found.') {
    super(message);
  }
}

const errors = {
  BadRequestError, UnauthorizedError, InternalServerError, ResourceNotFoundError,
};

export default Object.freeze(errors);
export {
  BadRequestError, UnauthorizedError, InternalServerError, ResourceNotFoundError,
};
