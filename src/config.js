import dotenv from 'dotenv';

dotenv.config();

const config = {
  token: {
    secret: process.env.JWT_SECRET_KEY,
    expireTime: 30 * 60,
  },

  http: {
    port: process.env.HTTP_PORT,
  },

  database: {
    host: process.env.MONGO_DB_HOST,
    name: process.env.MONGO_DB_DATABASE,
    port: process.env.MONGO_DB_PORT,
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
  },
};

export default Object.freeze(config);
