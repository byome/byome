import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),

  miscDeath: DS.attr('string'), // for debugging, like animals or suicide, will categorize

  // Associations
  server: DS.belongsTo('server'),
  player: DS.belongsTo('player'),
  kill: DS.belongsTo('kill'),
  activity: DS.belongsTo('activity')
});
