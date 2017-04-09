import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),

  miscDeath: DS.attr('string'), // for debugging, like animals or suicide, will categorize

  // Associations
  server: DS.belongsTo('server'),
  player: DS.belongsTo('player'),
  kill: DS.belongsTo('kill')
});
