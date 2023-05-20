const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.lh84toi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
}

async function testSessionExist(number) {
  try {
    const database = client.db('Entelect');
    const collection = database.collection('HealthCheck');

    const existingDoc = await collection.findOne({ _id: number });

    if (existingDoc) {
      return existingDoc;
    } else {
      const newDoc = { 
        _id: number,
        backToMainMenu: true,
        testSessionID: false,
        userInputSessionID: '',
        testSessionIDMenu: false,
      };
      const result = await collection.insertOne(newDoc);
      console.log('New document added for: ', number);
      return newDoc;
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    return null;
  }
}

async function endSessionDelete(number) {
  try {
    const database = client.db('Entelect');
    const collection = database.collection('HealthCheck');

    const result = await collection.deleteOne({ _id: number });

    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
      return true;
    } else {
      console.log('Document not found');
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
  return false;
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
  testSessionExist,
  endSessionDelete,
};
