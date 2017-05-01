import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),
  remaniningInfo: DS.attr('string'), // TODO: So while we record new types of kills, this works

  // Associations
  server: DS.belongsTo('server', { async: true }),
  player: DS.belongsTo('player', { async: true }),
  death: DS.belongsTo('death', { async: true }),
  activity: DS.belongsTo('activity', { async: true, inverse: 'kindId' })
});
