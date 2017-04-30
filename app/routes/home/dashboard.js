import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Dashboard',
  store: Ember.inject.service('store'),

  // afterModel(controller, model) {
  //   this.super(controller, model);
  //   this.get('store').query('connections')
  // }
});
