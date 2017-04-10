/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    sentry: {
      publicUrl: 'https://byome.io', // the URL or CDN your js assets are served from
      sentryUrl: 'https://sentry.io', // the sentry install you're using, https://sentry.io for hosted accounts
      sentryOrganizationSlug: 'byome',
      sentryProjectSlug: 'byome-frontend',
      sentryBearerApiKey: '50400eb4ed394fecb2b027abeccdbea19c3c78198bb04011bee3997434b4ba54'
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
