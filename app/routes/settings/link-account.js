import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Link Account',
  session: Ember.inject.service('session'),
  playerNotLinked: Ember.computed.empty('session.userModel.player.name'),

  beforeModel() {
    if (!this.get('session')) {
      this.transitionTo('login');
    }
  },

  model() {
    return this.get('session.userModel');
  },

  generateToken: Ember.computed(function() {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
  }),

  afterModel(user) {
    if (this.get('playerNotLinked')) {
      user.set('associationToken', this.get('generateToken'));
      user.save();
    }
  }
});
