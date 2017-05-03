import Ember from 'ember';

const DEFAULT_AVATAR = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

export default Ember.Controller.extend({
  player: Ember.computed.alias('model'),
  playerAvatar: Ember.computed('player', function() {
    return this.get('player.avatar') || DEFAULT_AVATAR;
  }),

  serversCount: Ember.computed.alias('player.servers.[].length'),
  killCount: Ember.computed.alias('player.kills.[].length'),
  deathCount: Ember.computed.alias('player.deaths.[].length'),
  user: Ember.computed.alias('player.user'),
  kdRatio: Ember.computed.alias('player.kdRadio')
});
