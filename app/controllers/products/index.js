import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  dimebag: Ember.computed('model', function() {
    return this.get('model').findBy('slug', 'dimebag');
  }),

  fistfulofdollars: Ember.computed('model', function() {
    return this.get('model').findBy('slug', 'fistfulofdollars');
  }),

  forafewdollarsmore: Ember.computed('model', function() {
    return this.get('model').findBy('slug', 'forafewdollarsmore');
  }),

  goodbadugly: Ember.computed('model', function() {
    return this.get('model').findBy('slug', 'goodbadugly');
  }),

  actions: {
    buyKit(kit) {
      alert('Kits are coming soon!');
    }
  }
});
