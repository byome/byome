import Ember from 'ember';

const DEFAULT_AVATAR = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

export default Ember.Controller.extend({
  player: Ember.computed.alias('model'),
  playerAvatar: Ember.computed('player', function() {
    return this.get('player.avatar') || DEFAULT_AVATAR;
  }),

  user: Ember.computed.alias('player.user'),
  connections: Ember.computed.alias('player.connections.[]'),
  servers: Ember.computed.alias('player.servers.[]'),
  kills: Ember.computed.alias('player.kills.[]'),
  deaths: Ember.computed.alias('player.deaths.[]'),

  serversCount: Ember.computed.alias('servers.[].length'),
  killCount: Ember.computed.alias('kills.[].length'),
  deathCount: Ember.computed.alias('deaths.[].length'),
  kdRatio: Ember.computed.alias('player.kdRatio'),

  isOnline: Ember.computed('connections', function() {
    return this.get('connections').filterBy('connected', true).get('length') > 0;
  })
});
