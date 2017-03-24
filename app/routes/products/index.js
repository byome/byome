import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Kits',
  session: Ember.inject.service('session'),

  model() {
    return this.get('store').findAll('product');
  }
});
