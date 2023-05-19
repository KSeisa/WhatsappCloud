const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const axios = require("axios");
require('dotenv').config();
const app = express().use(bodyParser.json());

const { createBot } = require('whatsapp-cloud-api');

const { SESSION_SECRET, AUTH_TOKEN, PHONE_NUMBER_ID, VERIFY_TOKEN, PORT} = process.env;

const bot = createBot(PHONE_NUMBER_ID, AUTH_TOKEN);

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.listen(PORT, () => console.log(`webhook is listening on port ${PORT}`));


app.post("/webhook", (req, res) => {

  let body = req.body;

  console.log(JSON.stringify(req.body, null, 2));
});

// app.post("/webhook", (req, res) => {

//   let body = req.body;

//   console.log(JSON.stringify(req.body, null, 2));

//   if (req.body.object) {
//     if (
//       req.body.entry &&
//       req.body.entry[0].changes &&
//       req.body.entry[0].changes[0] &&
//       req.body.entry[0].changes[0].value.messages &&
//       req.body.entry[0].changes[0].value.messages[0]
//     ) {
//       let phone_number_id =
//         req.body.entry[0].changes[0].value.metadata.phone_number_id;
//       let from = req.body.entry[0].changes[0].value.messages[0].from; 
//       let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; 
//       axios({
//         method: "POST", 
//         url:
//           "https://graph.facebook.com/v12.0/" +
//           phone_number_id +
//           "/messages?access_token=" +
//           token,
//         data: {
//           messaging_product: "whatsapp",
//           to: from,
//           text: { body: "Ack: " + msg_body },
//         },
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(404);
//   }
// });

app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

app.get('/send', async (req, res) => {
  const to = '27760411047';
  try {
    const result = await bot.sendText(to, 'Hello world Andre');

    console.log(result);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error sending message:', error.message);
    res.sendStatus(500);
  }
});

app.get('/message', (req, res) => {
  console.log('sssssssss');
});