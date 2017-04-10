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

    contentSecurityPolicy: {
      'default-src': [
        "'self'"
      ],
      'script-src': [
        "'self'",
        "'unsafe-eval'",
        "'unsafe-inline'",
        "apis.google.com",
        "www.google-analytics.com",
        "js.stripe.com",
        "cdn.ravenjs.com"
      ],
      'frame-src': [
        "'self'",
        "https://*.firebaseapp.com",
        "js.stripe.com"
      ],
      'connect-src': [
        "'self'",
        "wss://*.firebaseio.com",
        "https://*.googleapis.com",
        "www.google-analytics.com",
        "app.getsentry.com",
        "sentry.io"
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'"
      ],
      'img-src': [
        "'self'",
        "byome-fcaae.appspot.com",
        "www.google-analytics.com",
        "*.byome.io:28015",
        "app.getsentry.com"
      ]
    },

    firebase: {
      apiKey: 'AIzaSyDJxOKoFlnk-j65DvIFSyqL-zw9j8w00rI',
      authDomain: 'byome-fcaae.firebaseapp.com',
      databaseURL: 'https://byome-fcaae.firebaseio.com',
      storageBucket: 'byome-fcaae.appspot.com',
      messageSenderId: '1047257712850'
    },

    torii: {
      sessionServiceName: 'session'
    },

    metricsAdapters: [
      {
        name: 'GoogleAnalytics',
        environments: ['development', 'production'],
        config: {
          id: 'UA-94075514-1'
        }
      }
    ],

    stripe: {
      publishableKey: 'pk_test_C656VQVF0FfLNOCGmcem3hfD'
    },

    sentry: {
      cdn: 'https://cdn.ravenjs.com/3.14.0/raven.min.js',
      dsn: 'https://9fff740211b245508a63dc7852c969fb@sentry.io/156722',
      debug: true,
      development: false,
      exposedPropertyName: 'raven',
      serviceName: 'raven',
      globalErrorCatching: true,
      whitelistUrls: ['localhost:4200', 'byome.io']
    }
  };


  /**
   * DEVELOPMENT
   */
  if (environment === 'development') {
    ENV.metricsAdapters[0].config.debug = true;
    ENV.metricsAdapters[0].config.trace = true;

    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }


  /**
   * TEST
   */
  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }


  /**
   * PRODUCTION
   */
  if (environment === 'production') {
    ENV.metricsAdapters[0].config.sendHitTask = true;
    ENV.stripe.publishableKey = 'pk_live_3szcZmkaGIEgh7IxOTZ8ncti';
  }

  return ENV;
};
