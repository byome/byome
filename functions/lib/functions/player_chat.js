const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const messagesRef = DB.ref('messages');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  try {
    messagesRef.push({
      timestamp: new Date(),
      content: data.content,
      player: data.playerId,
      server: data.serverId
    });

    res.status(200).send('OK');
  } catch(error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});
