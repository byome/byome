const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');
const ServerKeys = functions.config().rust.servers.api_keys;

// Refs
const usersRef = DB.ref('users');
const playersRef = DB.ref('players');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  usersRef
    .orderByChild('associationToken')
    .equalTo(data.associationToken.toUpperCase())
    .once('value')
    .then((user) => {
      let userKey = Object.keys(user.val())[0]; // TODO: Why?
      if (user.val() === null) {
        throw new Error('Association Token not found');
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
