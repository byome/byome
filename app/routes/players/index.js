import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  queryParams: {
    pageFromPlayer: { refreshModel: true },
    perPage: { refreshModel: true }
  },

  titleToken: 'Players',

  beforeModel() {
    if (!this.can('index player')) {
      this.transitionTo('home.dashboard');
    }
  },

  model(params) {
    return this.get('store').query('player', {
      orderBy: 'name',
      startAt: this.get('params.pageFromPlayer'),
      limitToLast: this.get('params.perPage')
    });
  },

  // afterModel(controller, model) {
  //   this._super(controller, model);
  //   this.get('store').query('player', {
  //     orderBy: 'name',
  //     startAt: 'A',
  //     limitToFirst: 1
  //   }).then((startingPlayer) => {
  //     controller.set('pageFromPlayer', startingPlayer.get('firstObject.id'));
  //   });
  // }
});
