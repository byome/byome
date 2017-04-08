import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model(params) {
    return this.get('store').findRecord('server', params.server_id);
  },

  afterModel(model) {
    if (!this.can('show server', model)) {
      this.transitionTo('dashboard');
    }
  },

  titleToken(model) {
    return model.get('name');
  }
});
