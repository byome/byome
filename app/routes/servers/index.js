import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  titleToken: 'Servers',

  beforeModel() {
    if (!this.can('index server')) {
      this.transitionTo('home.dashboard');
    }
  },

  model() {
    return this.get('store').findAll('server');
  }
});
