const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const deathsRef = DB.ref('deaths');
const killsRef = DB.ref('kills');
const activitiesRef = DB.ref('activities');
const serversRef = DB.ref('servers');
const playersRef = DB.ref('players');

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
    let death = deathsRef.push({
      timestamp: timestamp,
      miscDeath: '',
      server: data.serverId,
      player: data.playerId
    });

    let kill = killsRef.push({
      timestamp: timestamp,
      remaniningInfo: '',
      server: data.serverId,
      player: data.perpetratorId,
      death: death.key
    });

    death.update({ kill: kill.key });

    serversRef.child(data.serverId).child(`deaths/${death.key}`).set(true);
    playersRef.child(data.playerId).child(`deaths/${death.key}`).set(true);
    if (data.perpetratorId) {
      serversRef.child(data.serverId).child(`kills/${kill.key}`).set(true);
      playersRef.child(data.perpetratorId).child(`kills/${kill.key}`).set(true);
    }

    activitiesRef.push({
      timestamp: timestamp,
      player: data.perpetratorId,
      server: data.serverId,
      action: 'player killed another player',
      kind: 'kill',
      kindId: kill.key
    });

    res.status(200).send('OK');
  } catch(error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});
