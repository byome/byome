import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  host: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('string'),
  location: DS.attr('string'),
  version: DS.attr('string'),

  // Associations
  players: DS.hasMany('player'),

  // Helpers
  isOnline: Ember.computed.equal('status', 'online')
});
