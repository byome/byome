import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),

  statusClass: Ember.computed('model.isOnline', function() {
    return this.get('model.isOnline') ? 'label-success' : 'label-default';
  })
});
