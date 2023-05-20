const { welcomeMessageStep, resetSessionVariables, endSessionMessage, 
        testSessionIDExistsStep, invalidOptionOccur, viewParticipants, 
        viewSessionNotes, viewSessionSummary, viewTrends } = require('./sessionController');
const { sendBasicMessage } = require('./whatsappMessageController');

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.lh84toi.mongodb.net/?retryWrites=true&w=majority";

async function connectMongoDB(){
  const client = new MongoClient(uri);
  await client.connect();

  const database = client.db('Entelect');
  const collection = database.collection('HealthCheck');
  return collection;
}
const collection = connectMongoDB();

// async function incomingMessageHandler(req, res, client) {
//     if (testIncommingMessage(req)) {
//       const messageBody = req.body.entry[0].changes[0].value.messages[0].text.body;
//       const sender = req.body.entry[0].changes[0].value.messages[0].from;
//       const SessionId = req.session.id;
//       const sessionData = req.session;

//       if (!sessionData.newSession) {
//         sessionData.newSession = true;
//         sessionData.backToMainMenu = true;
//       }

//       if (messageBody.toLowerCase() === 'sstop') {
//         endSessionMessage(req, sender);

//     } else if (sessionData.backToMainMenu) {
//         welcomeMessageStep(sessionData, sender);

//     } else if (sessionData.testSessionID) {
//         testSessionIDExistsStep(sender, sessionData, messageBody);

//     } else if (sessionData.testSessionIDMenu) {
//       if (messageBody === '1') {
//         viewParticipants(sender, sessionData);

//       } else if (messageBody === '2') {
//         viewSessionSummary(sender, sessionData);

//       } else if (messageBody === '3') {
//         viewSessionNotes(sender, sessionData);

//       } else if (messageBody === '4') {
//         viewTrends(sender, sessionData);

//       } else if (messageBody === '5') {
//         sendBasicMessage(sender,'Canceled option');
//         resetSessionVariables(sessionData);
//         welcomeMessageStep(twiml, sessionData);

//       } else {
//         invalidOptionOccur(sender);

//       }
//     } else {
//       sendBasicMessage(sender,'Sorry, something went wrong, please try again or contact support');
//       resetSessionVariables(sessionData);
//     }
//     console.log(SessionId);
//     }
// }

async function incomingMessageHandler(req, res) {
  if (testIncomingMessage(req)) {
    const { messageBody, sender } = getMessageDetails(req);

    const sessionObj = await testSessionExist(sender, collection);

    if (messageBody.toLowerCase() === 'stop') {
      endSessionMessage(sender);
      await endSessionDelete(sender, collection);

    } else if (sessionObj.backToMainMenu) {
      await welcomeMessageStep(sender, sessionObj,collection);

    } else if (sessionObj.testSessionID) {
      await testSessionIDExistsStep(sender, sessionObj, messageBody);

    } else if (sessionObj.testSessionIDMenu) {
      console.log('here');
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

async function testSessionExist(number, collection) {
  try {
    // const client = new MongoClient(uri);
    // await client.connect();

    // const database = client.db('Entelect');
    // const collection = database.collection('HealthCheck');

    const existingDoc = await collection.findOne({ _id: number });

    if (existingDoc) {
        console.log('Number already exists in the database: ', number);
     //   client.close();
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
    //    client.close();
        return newDoc;
      }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    return null;
  }
}

async function endSessionDelete(number, collection) {
  try {
    // const client = new MongoClient(uri);
    // await client.connect();

    // const database = client.db('Entelect');
    // const collection = database.collection('HealthCheck');

    const result = await collection.deleteOne({ _id: number });

    if (result.deletedCount === 1) {
      console.log('Document deleted successfully');
      return true;
    } else {
      console.log('Document not found');
    }

    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
  return false;
}
   
module.exports = {
    incomingMessageHandler,
};