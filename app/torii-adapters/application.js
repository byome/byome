import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  store: Ember.inject.service('store'),

  open(user) {
    return this._super(user).then((data) => {
      return this.get('store').query('user', { email: data.currentUser.email }).then((users) => {
        data.userModel = users.get('firstObject');
        return Ember.RSVP.resolve(data);
      });
    });
  }
});
