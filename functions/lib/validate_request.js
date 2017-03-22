const functions = require('firebase-functions');
const ServerKeys = functions.config().rust.servers.api_keys;

module.exports = function(req) {
  const apiKey = req.body.apiKey;
  const response = {
    valid: true,
    status: 200,
    message: 'OK'
  };

  // Fail if invalid HTTP request
  if (!req.method === 'POST') {
    response.valid = false;
    response.status = 422;
    response.message = "Request not POST";
  }

  // Fail if invalid API key
  if (!ServerKeys[apiKey]) {
    response.valid = false;
    response.status = 403;
    response.message = "Server API key invalid";
    return;
  }

  // Handle
  if (!response.valid) {
    console.error(response.message);
  }

  return response;
};
