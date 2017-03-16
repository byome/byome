const functions = require('firebase-functions');
const ServerKeys = require('../server_keys');
const DB = require('../database');

// Refs
const connectionsRef = DB.ref('connections');
const playersRef = DB.ref('players');
const serversRef = DB.ref('servers');

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
    })
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((error) => {
      res.status(500).send("There was an error.");
    });
});
