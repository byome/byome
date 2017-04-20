module.exports = (process) => {
  return {
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
  };
}