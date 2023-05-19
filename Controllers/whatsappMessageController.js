const twilio = require('twilio');
const { ACCOUNT_SID, AUTH_TOKEN } = process.env;

const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

async function sendBasicMessage(to, body) {
  try {
    const result = await bot.sendText(to, body);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.sendStatus(500);
  }
}

function sendBasicMediaMessage(to, body, imgUrl) {
  client.messages
    .create({
      body: body,
      from: 'whatsapp:+14155238886',
      to: to,
      mediaUrl: imgUrl,
    })
    .then((message) => console.log(`Message sent: ${message.sid}`))
    .catch((error) => console.log(`Error sending message: ${error}`));
}

module.exports = {
  sendBasicMessage,
  sendBasicMediaMessage,
};