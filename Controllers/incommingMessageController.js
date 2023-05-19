const { welcomeMessageStep, resetSessionVariables, endSessionMessage, 
        testSessionIDExistsStep, invalidOptionOccur, viewParticipants, 
        viewSessionNotes, viewSessionSummary, viewTrends } = require('./sessionController');

async function incomingMessageHandler(req, res) {
    const messageBody = req.body.entry[0].changes[0].value.messages[0].text.body;
    const sender = req.body.entry[0].changes[0].value.messages[0].from;
    const SessionId = req.session.id;
    const sessionData = req.session;
  
    if (!sessionData.newSession && testIncommingMessage(req)) {
      sessionData.newSession = true;
      sessionData.backToMainMenu = true;
    }

  console.log(sender);
    if (messageBody.toLowerCase() === 'sstop' && testIncommingMessage(req)) {
        endSessionMessage(req, sender);

    } else if (sessionData.backToMainMenu && testIncommingMessage(req)) {
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
        twiml.message('Canceled option');
        resetSessionVariables(sessionData);
        welcomeMessageStep(twiml, sessionData);

      } else {
        invalidOptionOccur(sender);

      }
    } else {
      twiml.message('Sorry, something went wrong, please try again or contact support');
      resetSessionVariables(sessionData);
    }
  
    res.set('Content-Type', 'text/xml');
    console.log(SessionId);
}

function testIncommingMessage(req) {
  if (req.body.entry && req.body.entry[0].changes && req.body.entry[0].changes[0] && req.body.entry[0].changes[0].value.messages && req.body.entry[0].changes[0].value.messages[0]) {
    return true;
  }
  else
  return false;
}
   
module.exports = {
    incomingMessageHandler,
};