import express from 'express';
import tokenHandler from '../helpers/jwt-token-handler.js';
import errorHandler from './error-handler.js';
import { adaptRequest } from './express-callback-adapter.js';
import { UnauthorizedError } from '../helpers/error-types.js';

const verifyToken = async (req, res, next) => {
  const httpRequest = adaptRequest(req);
  try {
    const { headers: { authorization } } = httpRequest;
    const errorMessage = 'Access token is missing or invalid.';
    if (!authorization) {
      throw new UnauthorizedError(errorMessage);
    }

    const token = authorization.replace(/^Bearer\s+/, '');
    if (!token) {
      throw new UnauthorizedError(errorMessage);
    }

    tokenHandler.isValid(token);
  } catch (error) {
    const { statusCode, message } = errorHandler(error);
    res.status(statusCode).json({ message });
    return;
  }

  next();
};

const setupMiddlewares = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};

export default setupMiddlewares;
export { verifyToken };
