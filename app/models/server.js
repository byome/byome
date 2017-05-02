import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  host: DS.attr('string'),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  status: DS.attr('string'),
  location: DS.attr('string'),
  version: DS.attr('string'),
  lastWipe: DS.attr('date'),
  nextWipe: DS.attr('date'),
  playerLimit: DS.attr('number'),

  // Associations
  players: DS.hasMany('player'),
  connections: DS.hasMany('connection'),
  redemptions: DS.hasMany('redemption'),
  messages: DS.hasMany('message'),
  kills: DS.hasMany('kill'),
  activities: DS.hasMany('activity', { inverse: null, async: true }),
  deaths: DS.hasMany('death'),

  // Helpers
  isOnline: Ember.computed.equal('status', 'online'),
  isRestarting: Ember.computed.equal('status', 'restarting'),
  isUpgrading: Ember.computed.equal('status', 'upgrading'),
  playersOnline: Ember.computed.filterBy('connections', 'connected', true),
  playersOnlineCount: Ember.computed('playersOnline.[]', function() {
    return this.get('playersOnline.[].length');
  }),
  playersOnlineWidth: Ember.computed('playersOnlineCount.[]', 'playerLimit', function() {
    return (this.get('playersOnlineCount') / this.get('playerLimit')) * 100;
  })
});
