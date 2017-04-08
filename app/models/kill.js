import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),
  remaniningInfo: DS.attr('string'), // TODO: So while we record new types of kills, this works

  // Associations
  server: DS.belongsTo('server'),
  victim: DS.belongsTo('player', inverse: 'victim'),
  perpetrator: DS.belongsTo('player', inverse: 'perpetrator'),
  death: DS.belongsTo('death')
});
