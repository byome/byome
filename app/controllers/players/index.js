import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['pageNumber', 'pageLimit'],
  pageNumber: 1,
  pageLimit: 10,

  players: Ember.computed.alias('model.[]'),
  numberOfPages: Ember.computed('model.[]', 'pageLimit', function() {
    const pageLimit = this.getWithDefault('pageLimit', 10);
    return Ember.RSVP.resolve(Math.floor(this.get('model.[].length') / pageLimit));
  })
  //
  // letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
});
