/*jshint node:true*/
/* global require, module */
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

  // FlatLab CSS
  app.import("vendor/css/bootstrap.css");
  app.import("vendor/css/bootstrap-reset.css");
  app.import("vendor/assets/font-awesome/css/font-awesome.css");
  app.import("vendor/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.css");
  app.import("vendor/css/owl.carousel.css");
  app.import("vendor/css/slidebars.css");
  app.import("vendor/css/style.css");
  app.import("vendor/css/style-responsive.css");

  // FlatLab JS
  app.import("vendor/js/jquery.js");
  app.import("vendor/js/bootstrap.js");
  app.import("vendor/js/jquery.dcjqaccordion.2.7.js");
  app.import("vendor/js/jquery.scrollTo.min.js");
  app.import("vendor/js/jquery.nicescroll.js");
  app.import("vendor/js/jquery.sparkline.js");
  app.import("vendor/assets/jquery-easy-pie-chart/jquery.easy-pie-chart.js");
  app.import("vendor/js/owl.carousel.js");
  app.import("vendor/js/slidebars.min.js");
  app.import("vendor/js/common-scripts.js");
  app.import("vendor/js/sparkline-chart.js");
  app.import("vendor/js/easy-pie-chart.js");

  // FlatLab Fonts
  app.import("vendor/fonts/glyphicons-halflings-regular.eot", { destDir: "fonts" });
  app.import("vendor/fonts/glyphicons-halflings-regular.svg", { destDir: "fonts" });
  app.import("vendor/fonts/glyphicons-halflings-regular.ttf", { destDir: "fonts" });
  app.import("vendor/fonts/glyphicons-halflings-regular.woff", { destDir: "fonts" });
  app.import("vendor/fonts/glyphicons-halflings-regular.woff2", { destDir: "fonts" });
  app.import("vendor/assets/font-awesome/fonts/fontawesome-webfont.eot", { destDir: "fonts" });
  app.import("vendor/assets/font-awesome/fonts/fontawesome-webfont.svg", { destDir: "fonts" });
  app.import("vendor/assets/font-awesome/fonts/fontawesome-webfont.ttf", { destDir: "fonts" });
  app.import("vendor/assets/font-awesome/fonts/fontawesome-webfont.woff", { destDir: "fonts" });

  // FlatLab Images
  var images = new Funnel("vendor/img", {
    srcDir: "/",
    include: ["**/*.gif", "**/*.jpg", "**/*.png"],
    destDir: "/img"
  });

  return app.toTree(images);
};
