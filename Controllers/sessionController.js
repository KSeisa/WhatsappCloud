const { testUserInputSessionID } = require('./healthCheckController');
const { sendBasicMessage } = require('./whatsappMessageController');
const { lineChart, verticalBarChart, horizontalBarChart, pieChart, doughnutChart } = require('./generateImagesController');

async function resetSessionVariables(to, sessionObj, client) {
    sessionObj.backToMainMenu = true;
    sessionObj.testSessionID = false;
    sessionObj.userInputSessionID = '';
    sessionObj.testSessionIDMenu = false;
    await updateDocumentById(to, sessionObj, client);
}

async function welcomeMessageStep(to, sessionObj, client) {
    sendBasicMessage(to,'*Welcome to Entelect Health Check Chatbot!*\nReply ```stop``` to end the session anytime.\n\nPlease enter the session ID:');
    sessionObj.backToMainMenu = false;
    sessionObj.testSessionID = true;
    await updateDocumentById(to, sessionObj, client);
}

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

function endSessionMessage(to) {
    sendBasicMessage(to, 'Please take care. Goodbye :)');
}

async function testSessionIDExistsStep(to, sessionObj, messageBody, client) {
    sessionObj.userInputSessionID = messageBody;
    if (testUserInputSessionID(sessionObj)) {
        sessionObj.testSessionID = false;
        sessionObj.testSessionIDMenu = true;
        mainMenuMessage(to);
        await updateDocumentById(to, sessionObj, client);
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

function viewParticipants(to) {
    sendBasicMessage(to,'*The participants in the Team 1 - 09/03/2023 are as follows:*\n1. Zane - Host\n2. Wesley Chetty - Member');
    mainMenuMessage(to);
}

function viewSessionSummary(to) {
    sendBasicMessage(to,'*The categories for this session:*\n1. Trust (Sentiment - Green)\n2. Exposure (Sentiment - Amber)\n\n_*To view participant sentiments, reply with the category number:*_');
}

function viewSessionNotes(to) {
    sendBasicMessage(to,'Session notes');
    mainMenuMessage(to);
}

async function viewTrends(to) {
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