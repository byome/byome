const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const connectionsRef = DB.ref('connections');
const playersRef = DB.ref('players');
const serversRef = DB.ref('servers');
const activitiesRef = DB.ref('activities');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  playersRef
    .child(data.playerId)
    .once('value')
    .then((player) => {
      if (!player.exists()) {
        playersRef.child(data.playerId).set({ name: data.playerName });
        return playersRef.child(data.playerId);
      } else {
        return player.ref;
      }
    })
    .then((player) => {
      player.child(`servers/${data.serverId}`).set(true);
      serversRef.child(data.serverId).child(`players/${data.playerId}`).set(true);
      return player;
    })
    .then((player) => {
      connectionsRef.child(`${data.serverId}-${data.playerId}`).set({
        player: data.playerId,
        server: data.serverId,
        ipAddress: data.playerIpAddress,
        connected: true,
        sleeping: true
      });
      serversRef.child(data.serverId).child(`connections/${data.serverId}-${data.playerId}`).set(true);
      player.child('connections').child(`${data.serverId}-${data.playerId}`).set(true);
      return player;
    })
    .then((player) => {
      activitiesRef.push({
        timestamp: (new Date()).toJSON(),
        player: data.playerId,
        server: data.serverId,
        kind: 'player connected',
        kindId: `${data.serverId}-${data.playerId}`
      });
    })
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((error) => {
      res.status(500).send("There was an error.");
    });
});
