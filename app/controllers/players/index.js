import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['query'],
  query: '',

  store: Ember.inject.service('store'),

  totalPlayers: 0
});
