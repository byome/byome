import DS from 'ember-data';

export default DS.Model.extend({
  kind: DS.attr('string'),
  name: DS.attr('string'),
  slug: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr(),
  image: DS.attr('string'),
  redemptions: DS.attr('number'),

  purchases: DS.hasMany('purchase')
});
