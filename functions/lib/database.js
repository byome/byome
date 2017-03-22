const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize
admin.initializeApp(functions.config().firebase);

module.exports = database = admin.database();
