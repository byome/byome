import DS from 'ember-data';

export default DS.Model.extend({
  timestamp: DS.attr('date'),

  purchase: DS.belongsTo('purchase'),
  server: DS.belongsTo('server')
});
