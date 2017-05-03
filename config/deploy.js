/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    sentry: require('./deploy/sentry')(process),
    firebase: require('./deploy/firebase')(process),
    slack: require('./deploy/slack')(process),
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
  }

  return ENV;
};
