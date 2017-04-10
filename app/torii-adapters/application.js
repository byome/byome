import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  store: Ember.inject.service('store'),
  firebase: Ember.inject.service('firebase'),
  raven: Ember.inject.service('raven'),

  findAndSetUser(data) {
    return this.get('store').findRecord('user', data.currentUser.uid).then((user) => {
      data.userModel = user;
      return data;
    });
  },

  authorizeUser(data) {
    return this.get('firebase').ref.child(`authentication-roles/${data.userModel.id}`).once('value').then((role) => {
      data.userModel.set('role', role.val() || 'user');
      return data;
    });
  },

  open(user) {
    return this._super(user).then((data) => {
      return this.findAndSetUser(data)
        .then(this.authorizeUser.bind(this))
        .then(data => Ember.RSVP.resolve(data))
        .catch(error => this.get('raven').captureException(error));
    });
  }
});
