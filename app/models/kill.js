import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),
  remaniningInfo: DS.attr('string'), // TODO: So while we record new types of kills, this works

  // Associations
  server: DS.belongsTo('server'),
  player: DS.belongsTo('player'),
  death: DS.belongsTo('death'),
  activity: DS.belongsTo('activity')
});
