import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  titleToken: 'Login',

  beforeModel() {
    this.controllerFor('application').set('loginOrRegisterRoute', true);
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('home');
    }
  },

  didTransition() {
    this.controllerFor('application').set('loginOrRegisterRoute', false);
  }
});
