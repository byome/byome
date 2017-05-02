import Ember from 'ember';

export default Ember.Controller.extend({
  sortDirection: ['timestamp:desc'],
  reversedActivities: Ember.computed('model.[]', 'sortDirection', function() {
    return this.get('model').toArray().reverse();
  })
});
