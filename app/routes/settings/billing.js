import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Billing',
  session: Ember.inject.service('session'),

  model() {
    return this.get('session.userModel');
  }
});
