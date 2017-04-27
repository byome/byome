import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  model(params) {
    return this.get('store').findRecord('server', params.server_id);
  },

  afterModel(model) {
    if (!this.can('show server', model)) {
      this.transitionTo('home');
    }
  },

  titleToken(model) {
    return model.get('name');
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.get('store').query('kill', {
      orderBy: 'server',
      equalTo: model.get('id'),
      limitToLast: 10
    }).then((serverKills) => {
      controller.set('killFeed', serverKills.toArray().reverse());
    });
  }
});
