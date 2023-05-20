const { testUserInputSessionID } = require('./healthCheckController');
const { sendBasicMessage } = require('./whatsappMessageController');
const { lineChart, verticalBarChart, horizontalBarChart, pieChart, doughnutChart } = require('./generateImagesController');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.lh84toi.mongodb.net/?retryWrites=true&w=majority";

function resetSessionVariables(sessionData) {
    sessionData.newSession = true;
    sessionData.backToMainMenu = true;
    sessionData.testSessionID = false;
    sessionData.UserInputSessionID = '';
    sessionData.testSessionIDMenu = false;
}

async function welcomeMessageStep(to, sessionObj) {
    sendBasicMessage(to,'*Welcome to Entelect Health Check Chatbot!*\nReply ```sstop``` to end the session anytime.\n\nPlease enter the session ID:');
    sessionObj.backToMainMenu = false;
    sessionObj.testSessionID = true;
    await updateDocumentById(to, sessionObj);
}

async function updateDocumentById(number, updateFields) {
    try {
        const client = new MongoClient(uri);

      await client.connect();
  
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
  
      client.close();
      console.log('Disconnected from MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

function endSessionMessage(to) {
    sendBasicMessage(to,'Please take care. Goodbye :)');
}

function testSessionIDExistsStep(to, sessionData, messageBody) {
    sessionData.UserInputSessionID = messageBody;
    if (testUserInputSessionID(sessionData)) {
      sessionData.testSessionID = false;
      sessionData.testSessionIDMenu = true;
      mainMenuMessage(to);
    } else {
      sendBasicMessage(to,'Session ID does not exist. Please enter another session ID.');
    }
}

function mainMenuMessage(to) {
    sendBasicMessage(to,'Please select the data you want to be displayed:\n1. View Participants\n2. View Session Summary\n3. View Session notes\n4. View Trends\n5. Cancel');
}

function invalidOptionOccur(to) {
    sendBasicMessage(to,'*Invalid option*\nPlease select the data you want to be displayed:\n1. View Participants\n2. View Session Summary\n3. View Session notes\n4. View Trends\n5. Cancel');
}

function viewParticipants(to, sessionData) {
    sendBasicMessage(to,'*The participants in the Team 1 - 09/03/2023 are as follows:*\n1. Zane - Host\n2. Wesley Chetty - Member');
    mainMenuMessage(to);
}

function viewSessionSummary(to, sessionData) {
    sendBasicMessage(to,'*The categories for this session:*\n1. Trust (Sentiment - Green)\n2. Exposure (Sentiment - Amber)\n\n_*To view participant sentiments, reply with the category number:*_');
}

function viewSessionNotes(to, sessionData) {
    sendBasicMessage(to,'Session notes');
    mainMenuMessage(to);
}

async function viewTrends(to, sessionData) {
    const imageUrl = await pieChart();
    //sendBasicMediaMessage(to, 'Please select the data you want to be displayed:\n1. View Participants\n2. View Session Summary\n3. View Session notes\n4. View Trends\n5. Cancel', imageUrl);
}
  
module.exports = {
    resetSessionVariables,
    welcomeMessageStep,
    endSessionMessage,
    testSessionIDExistsStep,
    invalidOptionOccur,
    viewParticipants,
    viewSessionSummary,
    viewSessionNotes,
    viewTrends,
};