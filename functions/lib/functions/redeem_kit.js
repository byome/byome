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
        const purchaseRef = purchasesRef.child(purchaseKey);
        purchaseRef.child('redemptionsLeft')
          .once('value')
          .then((redemptionsLeft) => {
            const remaining = redemptionsLeft.val();
            if (remaining > 0) {
              let redemptionRef = redemptionsRef.push();
              redemptionRef.update({
                timestamp: (new Date()).toJSON().toString(),
                purchase: purchaseKey,
                player: data.playerId,
                server: data.serverId
              });
              purchaseRef.child('redemptionsLeft').set(remaining - 1 || 0);
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
