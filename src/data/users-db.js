const transformToEntity = ({
  _id, name, email, password, phones, token, lastLogin, createdAt, updatedAt,
}) => ({
  id: _id, name, email, password, phones, token, lastLogin, createdAt, updatedAt,
});

const transformToDatabase = ({
  id, name, email, password, phones, token, lastLogin, createdAt, updatedAt,
}) => ({
  _id: id, name, email, password, phones, token, lastLogin, createdAt, updatedAt,
});

export default function buildUsersDb({ makeDb }) {
  const usersCollectionName = 'users';

  const getAll = async () => {
    const db = await makeDb();
    const collection = await db.collection(usersCollectionName);
    const results = await collection.find({}).toArray();
    return results.map(transformToEntity);
  };

  const getById = async (_id) => {
    const db = await makeDb();
    const collection = await db.collection(usersCollectionName);
    const foundUser = await collection.findOne({ _id });
    if (!foundUser) {
      return null;
    }

    return transformToEntity(foundUser);
  };

  const getByEmail = async (email) => {
    const db = await makeDb();
    const collection = await db.collection(usersCollectionName);
    const foundUser = await collection.findOne({ email });
    if (!foundUser) {
      return null;
    }

    return transformToEntity(foundUser);
  };

  const insert = async (user) => {
    const db = await makeDb();
    const dbUser = transformToDatabase(user);

    dbUser.createdAt = Date.now();
    dbUser.updatedAt = Date.now();

    await db.collection(usersCollectionName).insertOne(dbUser);
    return transformToEntity(dbUser);
  };

  const update = async (user) => {
    const db = await makeDb();
    const dbUser = transformToDatabase(user);
    const { _id } = dbUser;

    dbUser.updatedAt = Date.now();
    const result = await db.collection(usersCollectionName).updateOne({ _id }, {
      $set: { ...dbUser },
    });

    if (result.modifiedCount === 0) {
      return null;
    }

    return transformToEntity(dbUser);
  };

  return Object.freeze({
    getAll,
    getById,
    getByEmail,
    insert,
    update,
  });
}
