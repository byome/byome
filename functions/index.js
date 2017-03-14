const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Initialize
admin.initializeApp(functions.config().firebase);
const ServerKeys = {
  "e555e90a-9e70-4809-b9f4-1c105faada38": true
};


// Refs
const connectionsRef = functions.database.ref('connections');
const playersRef = functions.database.ref('players');
const serversRef = functions.database.ref('servers');


// User Session Events
exports.playerConnected = functions.https.onRequest((req, res) => {
  // Fail if invalid HTTP request
  if (!req.method === 'POST') {
    res.status(403).send('Forbidden!');
  }

  // Get Data
  const data = req.body;

  // Fail if invalid API key
  if (!ServerKeys[data.apiKey]) {
    res.status(403).send('Forbidden!');
  }

  playersRef
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
      res.status(200).send('OK');
    })
    .catch((error) => {
      res.status(500).send("There was an error.");
    });
});


// exports.playerConnected = functions.database.ref('/events/player_connected').onWrite(event => {
//   const data = event.data.val();
//   return playersRef
//     .child(data.id)
//     .once('value')
//     .then((player) => {
//       if (!player.exists()) {
//         playersRef.child(data.id).set({ name: data.name });
//         return playersRef.child(data.id);
//       } else {
//         return player.ref;
//       }
//     })
//     .then((player) => {
//       player.child(`servers/${data.server}`).set(true);
//       serversRef.child(data.server).child(`players/${data.id}`).set(true);
//       return player;
//     })
//     .then((player) => {
//       connectionsRef.child(`${data.server}-${data.id}`).set({
//         player: data.id,
//         server: data.server,
//         ipAddress: data.ipAddress,
//         connected: true
//       });
//       serversRef.child(data.server).child(`connections/${data.server}-${data.id}`).set(true);
//       player.child('connections').child(`${data.server}-${data.id}`).set(true);
//     })
//     .then(() => {
//       return resolve();
//     });
// });

// exports.playerDisconnected = functions.database.ref('/events/player_disconnected').onWrite(event => {1
//   const data = event.data.val();
//   connectionsRef.child(`${data.server}-${data.id}`).update({
//     connected: false
//   })
//   .then(() => {
//     resolve();
//   });
// });
