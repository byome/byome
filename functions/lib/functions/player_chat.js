const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const messagesRef = DB.ref('messages');
const activitiesRef = DB.ref('activities');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  try {
    const timestamp = (new Date).toJSON();
    let message = messagesRef.push({
      timestamp: timestamp,
      content: data.content,
      player: data.playerId,
      server: data.serverId
    });

    activitiesRef.push({
      timestamp: timestamp,
      player: data.playerId,
      server: data.serverId,
      eventType: 'player_chat',
      content: data.content,
      kind: 'message',
      kindId: message.key
    });

    res.status(200).send('OK');
  } catch(error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});
