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

    // Initializers
    contentSecurityPolicy: require('./initializers/content-security-policy')(process),
    firebase: require('./initializers/firebase')(process),
    torii: require('./initializers/torii')(process),
    metricsAdapters: require('./initializers/metrics_adapters')(process),
    stripe: require('./initializers/stripe')(process),
    sentry: require('./initializers/sentry')(process),
  };


  /**
   * DEVELOPMENT
   */
  if (environment === 'development') {
    ENV.metricsAdapters[0].config.debug = false;
    ENV.metricsAdapters[0].config.trace = false;

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
    ENV.sentry.development = false;
  }

  return ENV;
};
