import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),

  // Associations
  server: DS.belongsTo('server'),
  player: DS.belongsTo('player'),

  // Polymorphic of sorts
  kind: DS.attr('string'),
  kindId: DS.attr('string', { polymorphic: true }),

  // Helpers
  isMessage: Ember.computed.equal('kind', 'message'),
  isDeath: Ember.computed.equal('kind', 'death'),
  isKill: Ember.computed.equal('kind', 'kill'),
  playerConnected: Ember.computed.equal('kind', 'player connected'),
  playerDisconnected: Ember.computed.equal('kind', 'player disconnected'),
});
