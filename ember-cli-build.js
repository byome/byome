/* eslint-env node */
'use strict';

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: [
        'STRIPE_PUBLISHABLE_KEY',
        'FIREBASE_API_KEY',
        'FIREBASE_AUTH_DOMAIN',
        'FIREBASE_DATABASE_URL',
        'FIREBASE_STORAGE_BUCKET',
        'FIREBASE_MESSAGE_SENDER_ID',
        'SENTRY_CDN',
        'SENTRY_DSN'
      ],
      path: {
        development: './config/.env.development',
        production: './config/.env.production'
      }
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    }
  });


  // Maisonette CSS
  app.import("vendor/assets/lib/stroke-7/style.css");
  app.import("vendor/assets/lib/perfect-scrollbar/css/perfect-scrollbar.min.css");
  app.import("vendor/assets/css/app.css");

  // Maisonette JS
  app.import("vendor/assets/lib/jquery/jquery.min.js");
  app.import("vendor/assets/lib/tether/js/tether.min.js");
  app.import("vendor/assets/lib/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js");
  app.import("vendor/assets/lib/bootstrap/dist/js/bootstrap.min.js");
  app.import("vendor/js/app.js");

  // Maisonette Fonts (Open Sans)
  var maisonetteOpenSansFonts = new Funnel("vendor/assets/lib", {
    srcDir: "/open-sans",
    include: ["**/*.eot","**/*.ttf","**/*.svg","**/*.woff","**/*.woff2"],
    destDir: "/assets/lib/open-sans"
  });

  // Maisonette Fonts (Stroke 7)
  var maisonetteStroke7Fonts = new Funnel("vendor/assets/lib", {
    srcDir: "/stroke-7/fonts",
    include: ["**/*.eot","**/*.ttf","**/*.svg","**/*.woff","**/*.woff2"],
    destDir: "/assets/fonts"
  });

  // Maisonette Fonts (Raleway)
  var maisonetteRalewayFonts = new Funnel("vendor/assets/lib", {
    srcDir: "/raleway",
    include: ["**/*.eot","**/*.ttf","**/*.svg","**/*.woff","**/*.woff2"],
    destDir: "/assets/lib/raleway"
  });

  // Maisonette Images
  var maisonetteImages = new Funnel("vendor/img", {
    srcDir: "/",
    include: ["**/*.gif", "**/*.jpg", "**/*.png"],
    destDir: "/img"
  });

  return app.toTree([
    maisonetteImages,
    maisonetteOpenSansFonts,
    maisonetteStroke7Fonts,
    maisonetteRalewayFonts
  ]);
};
