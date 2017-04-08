import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  tagName: 'section',
  classNames: ['panel'],

  sleepingPlayers: Ember.computed('store', function() {
    return this.get('store').query('connection', {
      orderBy: 'sleeping',
      equalTo: true
    });
  }),
  sleepingPlayersCount: Ember.computed.alias('sleepingPlayers.length')
});
