import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service('store'),

  actions: {
    updateWipeDay() {
      this.set('model.lastWipe', new Date('4/20/2017'));
      this.set('model.nextWipe', new Date('4/27/2017'))
      this.get('model').save();
    }
  }
});
