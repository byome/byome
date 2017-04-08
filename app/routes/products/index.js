import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  titleToken: 'Kits',
  session: Ember.inject.service('session'),

  beforeModel() {
    if (!this.can('index product')) {
      this.transitionTo('dashboard');
    }
  },

  model() {
    return this.get('store').findAll('product');
  }
});
