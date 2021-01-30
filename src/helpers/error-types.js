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

class DomainError extends Error {
  constructor(message = 'Domain error.') {
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

class ConflictError extends Error {
  constructor(message = 'Conflict error.') {
    super(message);
  }
}

const errors = {
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
  ResourceNotFoundError,
  ConflictError,
  DomainError,
};

export default Object.freeze(errors);
export {
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
  ResourceNotFoundError,
  ConflictError,
  DomainError,
};
