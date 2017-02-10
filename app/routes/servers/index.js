import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Servers',

  model() {
    return this.get('store').findAll('server');
  }
});
