import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),
  raven: Ember.inject.service('raven'),
  metrics: Ember.inject.service('metrics'),

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

  selectedKit: null,

  actions: {
    setSelectedKit(kit) {
      this.set('selectedKit', kit);
      this.get('metrics').trackEvent('kitSelected', {
        kit: kit.get('slug'),
        user: this.get('session.userModel')
      });
    },

    resetSelectedKit() {
      this.set('selectedKit', null);
    },

    purchaseSelectedKit() {
      const kit = this.get('selectedKit');
      const purchase = this.get('store').createRecord('purchase', {
        product: kit,
        user: this.get('session.userModel')
      });
      purchase.save().then((purchase) => {
        alert('Congrats! You can now redeem your kit. Use /byomkit ' + purchase.code + ' to redeem.');
        this.get('metrics').trackEvent('kitPurchased', {
          kit: kit.get('slug'),
          user: this.get('session.userModel')
        });
      })
      .catch((error) => {
        this.get('raven').captureException(error);
        purchase.set('status', 'failed');
        purchase.set('notes', error);
        purchase.save();
      });
    }
  }
});
