const functions = require('firebase-functions');
const admin = require('firebase-admin');


// Initialize
admin.initializeApp(functions.config().firebase);
const ServerKeys = {
  "e555e90a-9e70-4809-b9f4-1c105faada38": true
};


// Refs
const connectionsRef = admin.database().ref('connections');
const playersRef = admin.database().ref('players');
const serversRef = admin.database().ref('servers');


// Server Events
exports.serverOnline = functions.https.onRequest((req, res) => {
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

  serversRef.child(data.serverId).update({
    status: 'online'
  })
  .then(() => {
    res.status(200).send('OK');
  })
  .catch((error) => {
    res.status(500).send("There was an error.");
  });
});


exports.serverOffline = functions.https.onRequest((req, res) => {
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


// User Session Events
exports.playerConnected = functions.https.onRequest((req, res) => {
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


exports.playerDisconnected = functions.https.onRequest((req, res) => {
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

  connectionsRef.child(`${data.serverId}-${data.playerId}`).update({
    connected: false
  })
  .then(() => {
    res.status(200).send("OK");
  })
  .catch((error) => {
    res.status(500).send("Something went wrong.");
  });
});


exports.playerSleep = functions.https.onRequest((req, res) => {
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

  connectionsRef.child(`${data.serverId}-${data.playerId}`).update({
    sleeping: true
  })
  .then(() => {
    res.status(200).send('OK');
  })
  .catch((error) => {
    res.status(500).send("There was an error.");
  });
});


exports.playerSleepEnded = functions.https.onRequest((req, res) => {
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

  connectionsRef.child(`${data.serverId}-${data.playerId}`).update({
    sleeping: false
  })
  .then(() => {
    res.status(200).send('OK');
  })
  .catch((error) => {
    res.status(500).send("There was an error.");
  });
});
