import mongodb from 'mongodb';
import buildUsersDb from './users-db.js';
import config from '../config.js';

const { MongoClient } = mongodb;

const {
  database: {
    host, name: dbName, port, user, password,
  },
} = config;

const uri = `mongodb://${user}:${password}@${host}:${port}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const makeDb = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }

  return client.db(dbName);
};

const usersDb = buildUsersDb({ makeDb });
const databases = Object.freeze({
  usersDb,
});

export default databases;
export { usersDb };
