import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('coming-soon');
  this.route('login');
  this.route('register');
  this.authenticatedRoute('dashboard');
  this.authenticatedRoute('servers', function() {
    this.route('show', { path: '/:server_id' });
  });
});

export default Router;
