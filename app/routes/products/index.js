import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Kits',

  model() {
    return this.get('store').findAll('product');
  }
});
