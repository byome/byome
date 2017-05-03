import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model(params) {
    return this.get('store').findRecord('player', params.player_id);
  },

  afterModel(model) {
    if (!this.can('show player', model)) {
      this.transitionTo('home.dashboard');
    }
  },

  titleToken(model) {
    return model.get('name');
  }
});
