import DS from 'ember-data';

export default DS.Model.extend({
  ipAddress: DS.attr('string'),
  ping: DS.attr('number'),
  connected: DS.attr('boolean'),
  sleeping: DS.attr('boolean'),
  isAdmin: DS.attr('boolean'),
  isBanned: DS.attr('boolean'),
  banTimeRemaining: DS.attr('number'),

  // Assocations
  player: DS.belongsTo('player'),
  server: DS.belongsTo('server'),
  activity: DS.belongsTo('activity')
});
