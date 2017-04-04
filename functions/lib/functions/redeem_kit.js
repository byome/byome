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
      if (!purchase.exists()) {
        throw new Error('Kit not found');
      } else {
        const purchaseKey = Object.keys(purchase.val())[0];
        purchasesRef.child(`${purchaseKey}/redemptionsLeft`)
          .once('value')
          .then((redemptionsLeft) => {
            console.log(redemptionsLeft.val());
            if (redemptionsLeft.val() > 0) {
              redemptionsRef.push({
                timestamp: new Date(),
                purchase: purchaseKey,
                player: data.playerId,
                server: data.serverId
              });
              purchase.child('redemptionsLeft').set(redemptionsLeft() - 1 || 0);
            } else {
              throw new Error("No redemptions for this kit are left.");
            }
          });
      }
    })
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error. essage);
    });
});
