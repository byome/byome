import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['timeline'],

  activities: null,
  reversedActivities: Ember.computed('activities', function() {
    return this.get('activities').toArray().reverse();
  })
});
