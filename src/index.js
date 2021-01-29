import app from './http/index.js';
import config from './config.js';

const { http: { port } } = config;

app.listen(port);
