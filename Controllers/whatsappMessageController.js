const { createBot } = require('whatsapp-cloud-api');

const { AUTH_TOKEN, PHONE_NUMBER_ID } = process.env;

const bot = createBot(PHONE_NUMBER_ID, AUTH_TOKEN);

async function sendBasicMessage(to, body) {
  try {
    await bot.sendText(to, body);
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

async function sendBasicMediaMessage(to, imageUrl) {
  try {
    const result = await bot.sendImage(to, imageUrl);
    console.log('Media message sent successfully');
  } catch (error) {
    console.error('Error sending media message:', error.message);
  }
}

module.exports = {
  sendBasicMessage,
  sendBasicMediaMessage,
};