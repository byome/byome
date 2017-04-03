import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service('store'),

  tagName: 'section',
  classNames: ['panel'],

  onlinePlayers: Ember.computed('store', function() {
    return this.get('store').query('connection', {
      orderBy: 'connected',
      equalTo: true
    });
  }),
  onlinePlayersCount: Ember.computed.alias('onlinePlayers.length')
});
