import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    host: process.env.MONGO_DB_HOST,
    name: process.env.MONGO_DB_DATABASE,
    port: process.env.MONGO_DB_PORT,
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD,
  },
};

export default Object.freeze(config);
