import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service('firebaseApp'),
  raven: Ember.inject.service('raven'),
  metrics: Ember.inject.service('metrics'),

  errorMessage: null,

  handleErrors(error) {
    const genericError = "Something went wrong. Please try again.";
    const firebaseErrors = {
      "auth/email-already-in-use": "Email address already in use.",
      "auth/weak-password": "The given password is too weak.",
      "auth/invalid-email": error.message,
    };
    const firebaseArgumentErrors = {
      "createUserWithEmailAndPassword failed: First argument \"email\" must be a valid string.": "Email is invalid",
      "createUserWithEmailAndPassword failed: Second argument \"password\" must be a valid string.": "Password is invalid"
    };
    const otherErrors = {
      "auth/blank-form": error.message
    };
    const errorMessage = firebaseErrors[error.code] || firebaseArgumentErrors[error.message] || otherErrors[error.code] || genericError;
    this.set('errorMessage', errorMessage);
    this.get('raven').captureException(new Error(errorMessage));
  },

  buildUser(user, firebaseUID) {
    const { email, name, username } = user.getProperties('email', 'name', 'username');
    return this.get('store').createRecord('user', {
      id: firebaseUID,
      email: email,
      name: name,
      username: username,
      registeredOn: (new Date()).toJSON()
    });
  },

  saveUser(user) {
    return user.save();
  },

  trackNewUserEvent(user) {
    return this.get('metrics').trackEvent('newUser', user.toJSON());
  },

  clearUserForm(user) {
    user.setProperties({
      email: null,
      name: null,
      username: null,
      password: null,
      passwordConfirmation: null
    });
  },

  createFirebaseUser(email, password) {
    if (!email && !password) {
      return Ember.RSVP.reject({
        code: "auth/blank-form",
        message: "You cannot create something out of nothing."
      });
    }
    try {
      return this.get('firebaseApp').auth().createUserWithEmailAndPassword(email, password);
    } catch(error) {
      return Ember.RSVP.reject(error);
    }
  },

  signUp: task(function * (user) {
    try {
      const { email, password } = user.getProperties('email', 'password');
      let newFirebaseUser = yield this.createFirebaseUser(email, password);
      let builtUser = yield this.buildUser(user, newFirebaseUser.uid);
      let savedUser = yield this.saveUser(builtUser);
      yield this.trackNewUserEvent(savedUser);
      yield this.clearUserForm(user);
      this.transitionToRoute('home.dashboard')
    } catch(error) {
      this.handleErrors(error);
    }
  })
});
