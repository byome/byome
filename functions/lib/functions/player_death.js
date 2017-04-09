const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const deathsRef = DB.ref('deaths');
const killsRef = DB.ref('kills');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  try {
    let death = deathRefs.push({
      timestamp: new Date(),
      miscDeath: '',
      server: data.serverId,
      player: data.playerId
    });

    let kill = killsRef.push({
      timestamp: new Date(),
      remaniningInfo: '',
      server: data.serverId,
      player: data.perpetratorId,
      death: death.key
    });

    kill.update(death: death.key);

    res.status(200).send('OK');
  } catch(error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});
