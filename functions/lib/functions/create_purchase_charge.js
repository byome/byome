const functions = require('firebase-functions');
const Stripe = require('stripe');
const Sentencer = require('sentencer');
const DB = require('../database');

const STRIPE_KEY = functions.config().stripe.secret_key;
const STRIPE_CURRENCY = 'USD';
const stripe = Stripe(STRIPE_KEY);

function randomNumber() {
  return Math.floor( Math.random() * (9999 - 1) ) + 1;
}

Sentencer.configure({
  actions: {
    number: function() {
      return randomNumber();
    }
  }
});

const stripeCustomersRef = DB.ref('stripe_customers');
const usersRef = DB.ref('users');
const purchasesRef = DB.ref('purchases');
const productsRef = DB.ref('products');

module.exports = functions.database.ref('/purchases/{purchaseId}').onWrite((event) => {
  // Only edit data when it is first created.
  if (event.data.previous.exists()) {
    return;
  }
  // Exit when the data is deleted.
  if (!event.data.exists()) {
    return;
  }

  const purchaseRef = event.data;
  const purchaseId = event.params.purchaseId;

  return stripeCustomersRef
    .child(purchaseRef.child('user').val())
    .once('value')
    .then((stripeCustomerToken) => {
      if (!stripeCustomerToken.exists()) {
        throw new Error(`Purchase ${purchaseId} failed: user ${purchaseRef.child('user').val()} does not have a stripe customer token.`);
      } else {
        return stripeCustomerToken.val();
      }
    })
    .then((stripeCustomerToken) => {
      return productsRef
        .child(purchaseRef.child('product').val())
        .once('value')
        .then((productRef) => {
          const product = productRef.val();
          purchaseRef.adminRef.update({
            amount: product.price,
            redemptionsLeft: 0
          });

          // Try to charge
          return new Promise((resolve, reject) => {
            stripe.charges.create({
              customer: stripeCustomerToken,
              amount: product.price * 100,
              currency: STRIPE_CURRENCY,
              description: `byome.io purchase: ${product.name} - ${product.kind}`
            }, {
              idempotency_key: purchaseId
            }, (err, charge) => {
              if (err) {
                reject(err);
              } else {
                purchaseRef.adminRef.update({
                  status: 'success',
                  redemptionsLeft: product.redemptions,
                  stripeId: charge.id,
                  code: Sentencer.make("{{adjective}}-{{noun}}-{{number}}")
                });
                console.log(`Charge for ${product.price} successful.`);
                resolve();
              }
            });
          });
        });
    })
    .catch((error) => {
      console.error(error);
      purchaseRef.adminRef.update({
        status: 'failed',
        notes: 'There was an error, please try again.'
      });
      return;
    })
});
