const functions = require('firebase-functions');
const DB = require('../database');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const usersRef = DB.ref('users');
const playersRef = DB.ref('players');

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

  usersRef
    .orderByChild('associationToken')
    .equalTo(data.associationToken.toUpperCase())
    .once('value')
    .then((user) => {
      let userKey = Object.keys(user.val())[0]; // TODO: Why?
      if (user.val() === null) {
        reject(new Error('Association Token not found'));
        return;
      } else {
        playersRef
          .child(data.playerId)
          .once('value')
          .then((player) => {
            player.ref.child('user').set(userKey);
            usersRef.child(userKey).update({
              player: player.ref.key,
              associationToken: null
            });
          });
      }
    })
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("There was an error.");
    });
});
