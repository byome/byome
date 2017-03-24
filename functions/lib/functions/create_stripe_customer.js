const functions = require('firebase-functions');
const Stripe = require('stripe');
const DB = require('../database');

const STRIPE_KEY = functions.config().stripe.secret_key_test;
const STRIPE_CURRENCY = 'USD';

const stripe = Stripe(STRIPE_KEY);
const stripeCustomersRef = DB.ref('stripe_customers');
const usersRef = DB.ref('users');

module.exports = functions.database.ref('/users/{userId}/stripeCardToken').onWrite((event) => {
  // Exit when the data is deleted.
  if (!event.data.exists()) {
    return;
  }
  
  const stripeCardToken = event.data.val();
  const userId = event.params.userId;

  if (stripeCardToken.toString() === 'true') {
    console.log('User already has stripe token.');
    return;
  }

  if (stripeCardToken === null || stripeCardToken.id || stripeCardToken.error) {
    console.error("Invalid stripe card token");
    return;
  }

  return stripeCustomersRef.child(userId).once('value').then(snapshot => {
    const customerToken = snapshot.val();
    if (customerToken) {
      return new Promise((resolve, reject) => {
        stripe.customers.update(customerToken, {
          source: stripeCardToken
        }, (error, customer) => {
          if (error) {
            reject(error);
          } else {
            usersRef.child(`${userId}/stripeCardToken`).set(true);
            resolve();
          }
        })
      });
    } else {
      return new Promise((resolve, reject) => {
        stripe.customers.create({
          description: userId,
          source: stripeCardToken
        }, (error, customer) => {
          if (error) {
            reject(error);
          } else {
            stripeCustomersRef.child(userId).set(customer.id);
            usersRef.child(`${userId}/stripeCardToken`).set(true);
            resolve();
          }
        })
      });
    }
  })
});
