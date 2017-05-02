const functions = require('firebase-functions');
const rp = require('request-promise');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;
const SteamAPIKey = functions.config().steam.api_key;


// Refs
const connectionsRef = DB.ref('connections');
const playersRef = DB.ref('players');
const serversRef = DB.ref('servers');
const activitiesRef = DB.ref('activities');


// Get Steam Avatar URL
function getSteamAvatar(playerId) {
  const endpoint = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${SteamAPIKey}&steamids=${playerId}`;
  return rp({ uri: endpoint, json: true });
}


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
      getSteamAvatar(data.playerId).then((res, res2) => {
        const avatar = res.response.players[0].avatarfull;
        player.child('avatar').set(avatar);
      });
      return player;
    })
    .then((player) => {
      activitiesRef.push({
        timestamp: (new Date()).toJSON(),
        player: data.playerId,
        server: data.serverId,
        kind: 'connection',
        eventType: 'player_connected',
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
