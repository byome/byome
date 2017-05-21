import Ember from 'ember';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  raven: Ember.inject.service('raven'),

  errorMessage: null,

  openSession(email, password) {
    if (!email && !password) {
      return Ember.RSVP.reject({
        code: "form/blank-form",
        message: "You cannot be nothing if you wish to be something."
      });
    }
    return this.get('session').open('firebase', {
      provider: 'password',
      email,
      password
    });
  },

  handleErrors(error) {
    const genericError = 'Something went wrong. Please try again.';
    const errorMessages = {
      "auth/user-not-found": "Email not found. Please check spelling.",
      "auth/wrong-password": "The given password is incorrect.",
      "auth/invalid-email": error.message,
      "form/blank-form": error.message,
    };
    this.set('errorMessage', errorMessages[error.code] || genericError);
    this.get('raven').captureException(new Error(error));
  },

  signIn: task(function * (user) {
    try {
      const { email, password } = user.getProperties('email', 'password');
      yield this.openSession(email, password);
      this.transitionToRoute('home.dashboard');
    } catch(error) {
      this.handleErrors(error);
    }
  }).drop(),

  actions: {
    resetPassword(user) {
      this.get('raven').captureMessage(`Password reset attempt: ${user.get('email')}`);
    }
  }
});
