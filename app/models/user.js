import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name: DS.attr('string'),
  username: DS.attr('string'),

  referralToken: DS.attr('string'),
  associationToken: DS.attr('string'),

  // Associations
  player: DS.belongsTo('player')
});
