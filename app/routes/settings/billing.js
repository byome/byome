import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Billing',
  session: Ember.inject.service('session'),

  beforeModel() {
    if (!this.get('session')) {
      this.transitionTo('login');
    }
  },

  model() {
    return this.get('session.userModel');
  }
});
