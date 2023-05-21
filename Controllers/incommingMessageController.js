const { welcomeMessageStep, resetSessionVariables, endSessionMessage, 
        testSessionIDExistsStep, invalidOptionOccur, viewParticipants, 
        viewSessionNotes, viewSessionSummary, viewTrends } = require('./sessionController');
const { sendBasicMessage } = require('./whatsappMessageController');

const { MongoClient } = require('mongodb');
const { MONGODB_URL } = process.env;
const url = MONGODB_URL;

const client = new MongoClient(url);

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

async function incomingMessageHandler(req, res) {
  if (testIncomingMessage(req)) {
    const { messageBody, sender } = getMessageDetails(req);

    const sessionObj = await testSessionExist(sender);

    if (messageBody.toLowerCase() === 'stop') {
      await endSessionMessage(sender);
      await endSessionDelete(sender, client);

    } else if (sessionObj.backToMainMenu) {
      await welcomeMessageStep(sender, sessionObj, client);

    } else if (sessionObj.testSessionID) {
      await testSessionIDExistsStep(sender, sessionObj, messageBody, client);

    } else if (sessionObj.testSessionIDMenu) {
      if (messageBody === '1') {
        await viewParticipants(sender);

      } else if (messageBody === '2') {
        await viewSessionSummary(sender);

      } else if (messageBody === '3') {
        await viewSessionNotes(sender);

      } else if (messageBody === '4') {
        await viewTrends(sender);

      } else if (messageBody === '5') {
        await sendBasicMessage(sender,'Canceled option');
        await resetSessionVariables(sender, sessionObj, client);
        await welcomeMessageStep(sender, sessionObj, client);

      } else {
        await invalidOptionOccur(sender);

      }
    }
    else {
      await sendBasicMessage(sender, 'Sorry, something went wrong, please try again or contact support');
      await resetSessionVariables(sender, sessionObj, client);
    }
  } 
  res.sendStatus(200); 
}

function getMessageDetails(req) {
  const entry = req.body.entry[0];
  const value = entry.changes[0].value;
  const messageBody = value.messages[0].text.body;
  const sender = value.messages[0].from;

  return { messageBody, sender };
}

function testIncomingMessage(req) {
  try {
    if (req.body.entry && req.body.entry[0].changes && req.body.entry[0].changes[0].value.messages && req.body.entry[0].changes[0].value.messages[0]) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
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

connectToDatabase();

process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
   
module.exports = {
    incomingMessageHandler,
};