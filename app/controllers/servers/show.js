import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),

  actions: {
    updateWipeDay() {
      let today = new Date();
      this.set('model.lastWipe', today);
      this.set('model.nextWipe', new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));
      this.get('model').save();
    }
  }
});
