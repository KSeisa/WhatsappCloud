const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const  MongoClient  = require('mongodb');

const app = express().use(bodyParser.json());

const { incomingMessageHandler } = require('./Controllers/incommingMessageController');

const { VERIFY_TOKEN, PORT } = process.env;

app.listen(PORT, () => console.log(`webhook is listening on port ${PORT}`));

app.post("/webhook", async (req, res) => {
  incomingMessageHandler(req, res);
});

// const uri = "mongodb+srv://dbUser:dbUserPassword@cluster0.lh84toi.mongodb.net/?retryWrites=true&w=majority";

// async function connectToMongoDB() {
//   try {
//     const client = new MongoClient(uri);
    
//     await client.connect();

//     const database = client.db('Entelect');
//     const collection = database.collection('HealthCheck');

//     // Perform operations on the collection

//     client.close();
//     console.log('Disconnected from MongoDB');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//     process.exit(1);
//   }
// }

//connectToMongoDB();

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