import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),

  // Associations
  server: DS.belongsTo('server'),

  // Polymorphic of sorts
  kind: DS.attr('string'),
  kindId: DS.attr('string')
});
