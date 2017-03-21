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
  this.route('coming-soon');
  this.route('login');
  this.route('register');
  this.authenticatedRoute('dashboard');
  this.authenticatedRoute('servers', function() {
    this.route('show', { path: '/:server_id' });
  });
  this.route('users', function() {
    this.route('link-account');
  });
});

export default Router;
