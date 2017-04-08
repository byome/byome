import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  username: DS.attr('string'),
  role: DS.attr('string'),

  referralToken: DS.attr('string'),
  associationToken: DS.attr('string'),
  stripeCardToken: DS.attr('string'),

  // Associations
  player: DS.belongsTo('player'),
  purchases: DS.hasMany('purchase')
});
