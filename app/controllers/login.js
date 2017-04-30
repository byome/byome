import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  raven: Ember.inject.service('raven'),

  errorMessage: null,
  signingIn: false,

  openSession(email, password) {
    if (!email && !password) {
      return Ember.RSVP.reject({ code: "form/blank-form", message: "You cannot be nothing if you wish to be something." });
    }
    return this.get('session').open('firebase', {
      provider: 'password',
      email,
      password
    });
  },

  actions: {
    signIn(user) {
      this.set('signingIn', true);
      const { email, password } = user.getProperties('email', 'password');
      this.openSession(email, password)
        .then(() => this.transitionToRoute('home.dashboard'))
        .catch((error) => this.handleErrors(error));
    },

    resetPassword(user) {
      this.get('raven').captureMessage(`Password reset attempt: ${user.get('email')}`);
    }
  },

  handleErrors(error) {
    this.get('raven').captureException(error);
    const genericError = 'Something went wrong. Please try again.';
    const errorMessages = {
      "auth/user-not-found": "Email not found. Please check spelling.",
      "auth/wrong-password": "The given password is incorrect.",
      "auth/invalid-email": error.message,
      "form/blank-form": error.message,
    };
    this.set('errorMessage', errorMessages[error.code] || genericError);
    this.set('signingIn', false);
  }
});
