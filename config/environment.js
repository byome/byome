/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'byome',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    firebase: {
      apiKey: 'AIzaSyDJxOKoFlnk-j65DvIFSyqL-zw9j8w00rI',
      authDomain: 'byome-fcaae.firebaseapp.com',
      databaseURL: 'https://byome-fcaae.firebaseio.com',
      storageBucket: 'byome-fcaae.appspot.com',
      messageSenderId: '1047257712850'
    },

    contentSecurityPolicy: {
      'script-src': [
        "'self'",
        "'unsafe-eval'",
        "apis.google.com"
      ],
      'frame-src': [
        "'self'",
        "https://*.firebaseapp.com"
      ],
      'connect-src': [
        "'self'",
        "wss://*.firebaseio.com",
        "https://*.googleapis.com"
      ],
      'style-src': [
        "'self'",
        "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
        "'sha256-kf82iNcbl2ymo+7CpNHC0krnmigdAQhl2ykUVLJRHmE='"
      ]
    },

    torii: {
      sessionServiceName: 'session'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
