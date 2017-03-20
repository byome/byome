import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  store: Ember.inject.service('store'),

  open(user) {
    return this._super(user).then((data) => {
      return this.get('store').findRecord('user', data.currentUser.uid).then((user) => {
        data.userModel = user;
        return Ember.RSVP.resolve(data);
      });
    });
  }
});
