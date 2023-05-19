const { welcomeMessageStep, resetSessionVariables, endSessionMessage, testSessionIDExistsStep, invalidOptionOccur, viewParticipants, viewSessionNotes, viewSessionSummary, viewTrends } = require('./sessionController');
const { sendBasicMessage } = require('./whatsappMessageController');

async function incomingMessageHandler(req, res) {
if (testIncommingMessage(req)) {
const messageBody = req.body.entry[0].changes[0].value.messages[0].text.body;
const sender = req.body.entry[0].changes[0].value.messages[0].from;
const SessionId = req.session.id;
const sessionData = req.session;
if (!sessionData.newSession) {
  sessionData.newSession = true;
  sessionData.backToMainMenu = true;
}

if (messageBody.toLowerCase() === 'sstop') {
  endSessionMessage(req, sender);
} else if (sessionData.backToMainMenu) {
  welcomeMessageStep(sessionData, sender);
} else if (sessionData.testSessionID) {
  testSessionIDExistsStep(sender, sessionData, messageBody);
} else if (sessionData.testSessionIDMenu) {
  if (messageBody === '1') {
    viewParticipants(sender, sessionData);
  } else if (messageBody === '2') {
    viewSessionSummary(sender, sessionData);
  } else if (messageBody === '3') {
    viewSessionNotes(sender, sessionData);
  } else if (messageBody === '4') {
    viewTrends(sender, sessionData);
  } else if (messageBody === '5') {
    sendBasicMessage(sender, 'Canceled option');
    resetSessionVariables(sessionData);
    welcomeMessageStep(twiml, sessionData);
  } else {
    invalidOptionOccur(sender);
  }
} else {
  sendBasicMessage(sender, 'Sorry, something went wrong, please try again or contact support');
  resetSessionVariables(sessionData);
}
console.log(SessionId);

}
}

function testIncommingMessage(req) {
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

module.exports = {
incomingMessageHandler,
};