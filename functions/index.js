const Functions = require('./lib');

// Server Events
exports.serverOnline  = Functions.severOnline;
exports.serverOffline = Functions.serverOffline;

// User Session Events
exports.playerConnected    = Functions.playerConnected;
exports.playerDisconnected = Functions.playerDisconnected;
exports.playerSleep        = Functions.playerSleep;
exports.playerSleepEnded   = Functions.playerSleepEnded;

// Commands
exports.linkAccount = Functions.linkAccount;
