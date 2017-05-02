import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['timeline-item'],

  activity: null,

  // store: Ember.inject.service('store'),
  // messageContent: Ember.computed('activity', function() {
  //   return this.get('activity.message').then((message) => {
  //     return message.get('content').toString();
  //   });
  // })
});
