import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  kind: DS.attr('string'),
  name: DS.attr('string'),
  permissionName: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr(),
  image: DS.attr('string'),
  uses: DS.attr('number')
});
