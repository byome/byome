import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  // Associations
  user: DS.belongsTo('user', { async: true }),
  servers: DS.hasMany('server', { async: true }),
  connections: DS.hasMany('connection', { async: true }),
  kills: DS.hasMany('kill', { async: true }),
  deaths: DS.hasMany('death', { async: true }),
  activities: DS.hasMany('activity', { async: true, inverse: 'kindId' })
});
