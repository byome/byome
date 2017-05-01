import Ember from 'ember';

export default Ember.Controller.extend({
  sortDirection: ['timestamp:desc'],
  reversedActivities: Ember.computed.sort('model.activities', 'sortDirection')
});
