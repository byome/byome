import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),
  eventType: DS.attr('string'),

  // Associations
  server: DS.belongsTo('server'),
  player: DS.belongsTo('player'),

  // Polymorphic of sorts
  kind: DS.attr('string'),
  kindId: DS.attr('string', { polymorphic: true }),

  // Helpers
  isMessage: Ember.computed.equal('eventType', 'player_chat'),
  isDeath: Ember.computed.equal('eventType', 'player_death'),
  isKill: Ember.computed.equal('eventType', 'player_kill'),
  isPlayerConnected: Ember.computed.equal('eventType', 'player_connected'),
  isPlayerDisconnected: Ember.computed.equal('eventType', 'player_disconnected'),
});
