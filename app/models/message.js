import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  content: DS.attr('string'),

  // Associations
  player: DS.belongsTo('player'),
  server: DS.belongsTo('server')
});
