import DS from 'ember-data';

export default DS.Model.extend({
  steamID: DS.attr('string'),
  name: DS.attr('string'),

  // Associations
  user: DS.belongsTo('user'),
  servers: DS.hasMany('server'),
  connections: DS.hasMany('connection')
});
