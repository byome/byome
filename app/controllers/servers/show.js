import Ember from 'ember';

export default Ember.Controller.extend({
  server: Ember.computed.alias('model.server'),
  kills: Ember.computed.alias('model.kills'),
  
  actions: {
    updateWipeDay() {
      let today = new Date();
      this.set('server.lastWipe', today);
      this.set('server.nextWipe', new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000));
      this.get('server').save();
    }
  }
});
