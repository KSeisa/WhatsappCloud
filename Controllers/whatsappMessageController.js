const { createBot } = require('whatsapp-cloud-api');

const { AUTH_TOKEN, PHONE_NUMBER_ID } = process.env;

const bot = createBot(PHONE_NUMBER_ID, AUTH_TOKEN);

async function sendBasicMessage(to, body) {
  try {
    const result = await bot.sendText(to, body);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

async function sendBasicMediaMessage(to, body, imageUrl) {
  try {
    const result = await bot.sendImage(to, imageUrl);
    console.log('Media message sent successfully');
    return result;
  } catch (error) {
    console.error('Error sending media message:', error.message);
    return null;
  }
}

module.exports = {
  sendBasicMessage,
  sendBasicMediaMessage,
};