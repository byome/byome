import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  titleToken: 'Login',

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('home.dashboard');
    }
  },

  activate() {
    this._super(...arguments);
    this.controllerFor('application').set('loginOrRegisterRoute', true);
  },

  deactivate() {
    this._super(...arguments);
    this.controllerFor('application').set('loginOrRegisterRoute', false);
  }
});
