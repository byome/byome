import Ember from 'ember';

const DEFAULT_AVATAR = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['project-item'],

  player: null,
  user: Ember.computed.alias('player.user'),
  connection: Ember.computed.alias('player.connection'),

  userName: Ember.computed('user', function() {
    return this.get('user.name') || 'No Byome User';
  }),
  isOnline: Ember.computed.equal('connection.connected', true),

  avatar: Ember.computed('player', function() {
    return this.get('player.avatar') || DEFAULT_AVATAR;
  })
});
