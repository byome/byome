const functions = require('firebase-functions');
const DB = require('../database');
const validateRequest = require('../validate_request');


// Refs
const purchasesRef = DB.ref('purchases');
const productsRef = DB.ref('products');

module.exports = functions.https.onRequest((req, res) => {
  const validRequest = validateRequest(req);
  if (!validRequest.valid) {
    res.status(validRequest.status).send(validRequest.message);
    return;
  }


  // Get Data
  const data = req.body;

  productsRef
    .orderByChild('slug')
    .equalTo(data.kitId.toLowerCase())
    .once('value')
    .then((product) => {
      if (product.val() === null) {
        throw new Error('Kit not found');
      } else {
        return Object.keys(product.val())[0]; // TODO: Why?
      }
    })
    .then((productKey) => {
      purchasesRef
        .orderByChild('user')
    })
    .then(() => {
      res.status(200).send('OK');
    })
    .catch((error) => {
      res.status(500).send("There was an error.");
    });
});
