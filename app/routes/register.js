import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  titleToken: 'Register',

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('dashboard');
    }
  }
});
