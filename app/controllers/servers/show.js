import Ember from 'ember';

export default Ember.Controller.extend({
  statusClass: Ember.computed('model.isOnline', function() {
    return this.get('model.isOnline') ? 'label-success' : 'label-default';
  })
});
