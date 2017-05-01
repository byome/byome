import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),
  content: DS.attr('string'),

  // Associations
  player: DS.belongsTo('player', { async: true }),
  server: DS.belongsTo('server', { async: true }),
  activity: DS.belongsTo('activity', { async: true, inverse: 'kindId' })
});
