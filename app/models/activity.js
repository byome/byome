import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  action: DS.attr('string'),

  // Associations
  server: DS.belongsTo('server'),
  player: DS.belongsTo('player'),

  // Polymorphic of sorts
  kind: DS.attr('string'),
  kindId: DS.attr('string')
});
