import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  queryParams: {
    pageNumber: { refreshModel: true },
    pageLimit: { refreshModel: true }
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
      startAt: this.get('params.pageNumber'),
      limitToFirst: this.get('params.pageLimit')
    });
  }
});
