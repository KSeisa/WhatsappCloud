const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express().use(bodyParser.json());

const { incomingMessageHandler } = require('./Controllers/incommingMessageController');

const { VERIFY_TOKEN, PORT } = process.env;

app.listen(PORT, () => console.log(`webhook is listening on port ${PORT}`));

app.post("/webhook", async (req, res) => {
  incomingMessageHandler(req, res, client);
});

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