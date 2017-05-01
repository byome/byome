import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),
  redemptionsLeft: DS.attr('number'),
  stripeId: DS.attr('string'),
  status: DS.attr('string'),
  notes: DS.attr('string'),
  timestamp: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),

  // Associations
  product: DS.belongsTo('product'),
  user: DS.belongsTo('user'),
  redemptions: DS.hasMany('redemption')
});
