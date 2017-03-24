import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  dimebag: Ember.computed('model', function() {
    return this.get('model').findBy('permissionName', 'dimebag');
  }),

  fistfulofdollars: Ember.computed('model', function() {
    return this.get('model').findBy('permissionName', 'fistfulofdollars');
  }),

  forafewdollarsmore: Ember.computed('model', function() {
    return this.get('model').findBy('permissionName', 'forafewdollarsmore');
  }),

  goodbadugly: Ember.computed('model', function() {
    return this.get('model').findBy('permissionName', 'goodbadugly');
  }),

  actions: {
    buyKit(kit) {
      alert('Kits are coming soon!');
    }
  }
});
