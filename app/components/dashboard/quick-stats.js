import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['widget', 'widget-indicators'],
  store: Ember.inject.service('store'),

  onlinePlayers: Ember.computed('store', function() {
    return this.get('store').query('connection', {
      orderBy: 'connected',
      equalTo: true
    });
  }),
  onlinePlayersCount: Ember.computed.alias('onlinePlayers.[].length'),

  sleepingPlayers: Ember.computed('store', function() {
    return this.get('store').query('connection', {
      orderBy: 'sleeping',
      equalTo: true
    });
  }),
  sleepingPlayersCount: Ember.computed.alias('sleepingPlayers.[].length'),

  kills: 0,
  deaths: 0,

  totalKills: Ember.computed.alias('kills.[].length'),
  totalDeaths: Ember.computed.alias('kills.[].length')
});
