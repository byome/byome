const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const connectionsRef = DB.ref('connections');
const activitiesRef = DB.ref('activities');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  connectionsRef.child(`${data.serverId}-${data.playerId}`).update({
    connected: false
  })
  .then((player) => {
    activitiesRef.push({
      timestamp: (new Date()).toJSON(),
      player: data.playerId,
      server: data.serverId,
      eventType: 'player_disconnected',
      kind: 'connection',
      kindId: `${data.serverId}-${data.playerId}`
    });
  })
  .then(() => {
    res.status(200).send("OK");
  })
  .catch((error) => {
    res.status(500).send("Something went wrong.");
  });
});
