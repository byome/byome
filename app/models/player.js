import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  avatar: DS.attr('string'),

  // Associations
  user: DS.belongsTo('user'),
  servers: DS.hasMany('server'),
  connections: DS.hasMany('connection'),
  kills: DS.hasMany('kill'),
  deaths: DS.hasMany('death'),
  activities: DS.hasMany('activity', { inverse: null, async: true })
});
