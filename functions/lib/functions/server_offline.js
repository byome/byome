const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const serversRef = DB.ref('servers');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  serversRef.child(data.serverId).update({
    status: 'offline'
  })
  .then(() => {
    res.status(200).send('OK');
  })
  .catch((error) => {
    res.status(500).send("There was an error.");
  });
});
