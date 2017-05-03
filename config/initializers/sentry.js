module.exports = (process) => {
  return {
    cdn: process.env.SENTRY_CDN,
    dsn: process.env.SENTRY_DSN,
    debug: true,
    development: true,
    exposedPropertyName: 'raven',
    serviceName: 'raven',
    globalErrorCatching: true,
    whitelistUrls: ['localhost:4200', 'byome.io']
  };
}
