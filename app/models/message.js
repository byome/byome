import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),
  content: DS.attr('string'),

  // Associations
  player: DS.belongsTo('player'),
  server: DS.belongsTo('server'),
  activity: DS.belongsTo('activity', { inverse: null })
});
