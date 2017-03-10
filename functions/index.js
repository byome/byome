const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Initialize
admin.initializeApp(functions.config().firebase);


// Refs
const connectionsRef = functions.database.ref('connections');
const playersRef = functions.database.ref('players');
const serversRef = functions.database.ref('servers');


// User Session Events
exports.playerConnected = functions.database.ref('/events/player_connected').onWrite(event => {
  const data = event.data.val();
  return playersRef
    .child(data.id)
    .once('value')
    .then((player) => {
      if (!player.exists()) {
        playersRef.child(data.id).set({ name: data.name });
        return playersRef.child(data.id);
      } else {
        return player.ref;
      }
    })
    .then((player) => {
      player.child(`servers/${data.server}`).set(true);
      serversRef.child(data.server).child(`players/${data.id}`).set(true);
      return player;
    })
    .then((player) => {
      connectionsRef.child(`${data.server}-${data.id}`).set({
        player: data.id,
        server: data.server,
        ipAddress: data.ipAddress,
        connected: true
      });
      serversRef.child(data.server).child(`connections/${data.server}-${data.id}`).set(true);
      player.child('connections').child(`${data.server}-${data.id}`).set(true);
    })
    .then(() => {
      return resolve();
    });
});
