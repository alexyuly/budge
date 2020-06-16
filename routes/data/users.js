module.exports = {
  async newUser(db, {
    name,
  }) {
    if (typeof name !== 'string') {
      throw new Error('Cannot create a new user with a name that is not a string.')
    }

    const collection = db.collection('users');
    await collection.insertOne({
      name,
    });
  },
};
