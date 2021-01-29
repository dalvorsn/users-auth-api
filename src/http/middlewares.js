import express from 'express';
import { adaptRequest } from './express-callback-adapter.js';
import { authController } from '../controllers/index.js';
import errorHandler from './error-handler.js';

const verifyToken = async (req, res, next) => {
  const httpRequest = adaptRequest(req);
  try {
    await authController(httpRequest);
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
