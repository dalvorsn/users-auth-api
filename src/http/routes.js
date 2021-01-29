import { makeCallback } from './express-callback-adapter.js';
import { verifyToken } from './middlewares.js';
import {
  signInController, signUpController, findUserController,
} from '../controllers/index.js';

const setupRoutes = (app) => {
  app.post('/sign-in', makeCallback(signInController));
  app.post('/sign-up', makeCallback(signUpController));
  app.get('/user/:id', verifyToken, makeCallback(findUserController));
};

export default setupRoutes;
