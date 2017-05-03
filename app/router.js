import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRountName', 'unknown');
      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('home', function() {
    this.route('dashboard');
  });
  this.route('servers', function() {
    this.route('show', { path: '/:server_id' });
  });
  this.route('products', function() {});
  this.authenticatedRoute('settings', function() {
    this.authenticatedRoute('link-account');
    this.authenticatedRoute('billing');
  });
  this.route('players', function() {
    this.route('show', { path: '/:player_id' });
  });
});

export default Router;
