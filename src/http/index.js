import express from 'express';
import setupRoutes from './routes.js';
import setupMiddlewares from './middlewares.js';

const app = express();
setupMiddlewares(app);
setupRoutes(app);

export default app;
