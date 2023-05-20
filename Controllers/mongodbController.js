async function updateDocumentById(number, updateFields, client) {
    try {
      const database = client.db('Entelect');
      const collection = database.collection('HealthCheck');
  
      const result = await collection.updateOne(
        { _id: number },
        { $set: updateFields }
      );
  
      if (result.matchedCount === 1) {
        console.log('Document updated successfully');
      } else {
        console.log('Document not found');
      }
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
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

async function endSessionDelete(number, client) {
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
    closeDatabaseConnection,
    updateDocumentById,
    connectToDatabase,
    testSessionExist,
    endSessionDelete,
}