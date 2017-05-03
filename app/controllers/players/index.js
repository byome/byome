import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['pageFromPlayer', 'perPage'],
  pageFromPlayer: 'A',
  perPage: 5,

  players: Ember.computed('model', 'pageFromPlayer', 'perPage', function() {
    return this.get('store').query('player', {
      orderBy: 'name',
      startAt: this.get('pageFromPlayer'),
      limitToFirst: this.get('perPage')
    });
  })
});
