module.exports = (process) => {
  return {
    publicUrl: process.env.SENTRY_PUBLIC_URL, // the URL or CDN your js assets are served from
    sentryUrl: process.env.SENTRY_URL, // the sentry install you're using, https://sentry.io for hosted accounts
    sentryOrganizationSlug: process.env.SENTRY_ORGANIZATION_SLUG,
    sentryProjectSlug: process.env.SENTRY_PROJECT_SLUG,
    sentryApiKey: process.env.SENTRY_API_KEY,
    sentryBearerApiKey: process.env.SENTRY_BEARER_API_KEY
  };
}
