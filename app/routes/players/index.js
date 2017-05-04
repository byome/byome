import Ember from 'ember';
import { CanMixin } from 'ember-can';

export default Ember.Route.extend(CanMixin, {
  queryParams: {
    query: { refreshModel: true }
  },

  titleToken: 'Players',
  minQueryLength: 3,

  beforeModel() {
    if (!this.can('index player')) {
      this.transitionTo('home.dashboard');
    }
  },

  model(params) {
    let playerQuery = params.query && params.query.toLowerCase();
    if (this.invalidQuery(params)) {
      return [];
    } else {
      return this.get('store').query('player', {
        order: 'name',
        startAt: (new Date(2016, 1, 1)).toJSON()
      }).then((players) => {
        return players.filter((player) => {
          return player.get('name').toLowerCase().includes(playerQuery);
        });
      });
    }
  },

  invalidQuery(params = { query: '' }) {
    let query = params.query;
    if (!query || query === '' || query.length < this.get('minQueryLength')) {
      return true;
    }
    return false;
  }
});
