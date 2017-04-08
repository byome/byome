import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),

  miscDeath: DS.attr('string'), // for debugging, like animals or suicide, will categorize

  // Associations
  server: DS.belongsTo('server'),
  victim: DS.belongsTo('player', { inverse: 'victim' }),
  pepertrator: DS.belongsTo('player', { inverse: 'pepertrator' }),
  kill: DS.belongsTo('kill')
});
