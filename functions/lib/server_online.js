const functions = require('firebase-functions');
const DB = require('../database');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const serversRef = DB.ref('servers');

module.exports = functions.https.onRequest((req, res) => {
  // Fail if invalid HTTP request
  if (!req.method === 'POST') {
    console.error("Request not POST");
    res.status(403).send('Forbidden!');
    return;
  }

  // Get Data
  const data = req.body;

  // Fail if invalid API key
  if (!ServerKeys[data.apiKey]) {
    console.error("Server API key invalid");
    res.status(403).send('Forbidden!');
    return;
  }

  serversRef.child(data.serverId).update({
    status: 'online'
  })
  .then(() => {
    res.status(200).send('OK');
  })
  .catch((error) => {
    res.status(500).send("There was an error.");
  });
});
