import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service('firebaseApp'),

  actions: {
    signUp(user) {
      this.get('firebaseApp')
        .auth()
        .createUserWithEmailAndPassword(user.get('email'), user.get('password'));
    }
  }
});
