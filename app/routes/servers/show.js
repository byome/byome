import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model(params) {
    return Ember.RSVP.hash({
      server: this.get('store').findRecord('server', params.server_id),
      kills: this.get('store').query('kill', {
        orderBy: 'server',
        equalTo: params.server_id,
        limitToLast: 10
      })
    });
  },

  afterModel(model) {
    if (!this.can('show server', model.server)) {
      this.transitionTo('home.dashboard');
    }
  },

  titleToken(model) {
    return model.get('server.name');
  }
});
