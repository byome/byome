import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  titleToken: 'Dashboard',

  feedLimit: 5,
  server: null,

  model() {
    return RSVP.hash({
      activities: this.get('store').query('activity', {
        orderBy: 'timestamp',
        limitToLast: this.get('feedLimit')
      }),
    });
  }
});
