import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),

  // Associations
  player: DS.belongsTo('player'),
  server: DS.belongsTo('server').
  activities: DS.hasMany('activities')
});
