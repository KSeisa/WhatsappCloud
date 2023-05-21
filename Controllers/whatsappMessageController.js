// const { createBot } = require('whatsapp-cloud-api');

// const { AUTH_TOKEN, PHONE_NUMBER_ID } = process.env;

// const bot = createBot(PHONE_NUMBER_ID, AUTH_TOKEN);

// async function sendBasicMessage(to, body) {
//   try {
//     await bot.sendText(to, body);
//   } catch (error) {
//     console.error('Error sending message:', error.message);
//   }
// }

// async function sendBasicMediaMessage(to, imageUrl) {
//   try {
//     const result = await bot.sendImage(to, imageUrl);
//     console.log('Media message sent successfully');
//   } catch (error) {
//     console.error('Error sending media message:', error.message);
//   }
// }
////////////////////
// const axios = require('axios');
// const { AUTH_TOKEN, PHONE_NUMBER_ID } = process.env;

// const url = `https://graph.facebook.com/v16.0/${PHONE_NUMBER_ID}/messages`;

// async function sendBasicMessage(to, body) {
//   const data = {
//     messaging_product: 'whatsapp',
//     to: to,
//     type: 'text',
//     text: body
//   };

//   try {
//     const response = await axios.post(url, data, {
//       headers: {
//         Authorization: `Bearer ${AUTH_TOKEN}`,
//         'Content-Type': 'application/json'
//       }
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.error('Error sending message:', error.message);
//   }
// }

const axios = require('axios');

const url = 'https://graph.facebook.com/v16.0/108570732243051/messages';
const accessToken = 'EAAjatt8FjXwBACo302dPR7yDX34N1lyzWJAoDg4makbQXq4nP2ZAPCtouBUofZCLsn4dxhZBRNoZBFZCJG5YuCDSCGlphppFjiTcPNETkJzF6lvQNBVXbaAmKt0MiRB7F4WGx5zZAL0fw75T0JyXgSlnpq39BA3HHebHedjeEktj4S7Y266okc6t553NZBruZBpu1kUFDJnFbylGzI3ExdSHOJlvHssY9ZCoZD';

async function sendBasicMessage(to, body) {
  const data = {
    messaging_product: 'whatsapp',
    to: '27760411047',
    type: 'text',
    text: 'Hello, world!'
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(response.data);
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