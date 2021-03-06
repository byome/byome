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
        limitToLast: this.get('feedLimit'),
        startAt: (new Date(2016, 4, 3)).toJSON()
      }),
      kills: this.get('store').findAll('kill'),
      deaths: this.get('store').findAll('death'),
      onlinePlayers: this.get('store').query('connection', {
        orderBy: 'connected',
        equalTo: true
      }),
      inactivePlayers: this.get('store').query('connection', {
        orderBy: 'sleeping',
        equalTo: true
      })
    });
  }
});
