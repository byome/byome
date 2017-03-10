import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Players',

  queryParams: {
    letter: {
      refreshModel: true
    }
  },

  model(params) {
    return this.get('store').query('player', {
      orderBy: 'key',
      startAt: params.letter.toLowerCase(),
      endAt: params.letter.toLowerCase()
    });
  }
});
