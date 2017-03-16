const functions = require('firebase-functions');
const ServerKeys = require('../server_keys');
const DB = require('../database');

// Refs
const connectionsRef = DB.ref('connections');

module.exports = functions.https.onRequest((req, res) => {
  // Fail if invalid HTTP request
  if (!req.method === 'POST') {
    res.status(403).send('Forbidden!');
    return;
  }

  // Get Data
  const data = req.body;

  // Fail if invalid API key
  if (!ServerKeys[data.apiKey]) {
    res.status(403).send('Forbidden!');
    return;
  }

  connectionsRef.child(`${data.serverId}-${data.playerId}`).update({
    connected: false
  })
  .then(() => {
    res.status(200).send("OK");
  })
  .catch((error) => {
    res.status(500).send("Something went wrong.");
  });
});
