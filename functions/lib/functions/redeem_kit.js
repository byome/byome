const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');


// Refs
const purchasesRef = DB.ref('purchases');
const productsRef = DB.ref('products');
const redemptionsRef = DB.ref('redemptions');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  purchasesRef
    .orderByChild('code')
    .equalTo(data.kitId.toLowerCase())
    .once('value')
    .then((purchase) => {
      if (purchase.val() === null) {
        throw new Error('Kit not found');
      } else {
        return purchase.ref;
      }
    })
    .then((purchase) => {
      const redemptionsLeft = purchase.child('redemptionsLeft').val();
      if (redemptionsLeft > 0) {
        redemptionsRef.push({
          timestamp: new Date(),
          purchase: purchase.key,
          player: data.playerId,
          server: data.serverId
        });
        purchase.child('redemptionsLeft').set(redemptionsLeft - 1);
      } else {
        throw new Error("No redemptions for this kit are left.");
      }
    })
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((error) => {
      res.status(500).send(error. essage);
    });
});
