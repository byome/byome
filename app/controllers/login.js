import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  raven: Ember.inject.service('raven'),

  errorMessage: null,
  signingIn: false,

  actions: {
    signIn(user) {
      const { email, password } = user.getProperties('email', 'password');
      this.get('session').open('firebase', {
        provider: 'password',
        email,
        password
      })
      .then(() => {
        this.transitionToRoute('home.dashboard');
      })
      .catch(this.handleErrors.bind(this));
    },

    resetPassword(user) {
      this.get('raven').captureException(new Error(`Password reset attempt: ${user.get('email')}`));
    }
  },

  handleErrors(error) {
    this.get('raven').captureException(error);
    if (error.code === "auth/user-not-found") {
      this.set('errorMessage', 'Email not found. Please check spelling.');
    } else
    if (error.code === "auth/wrong-password") {
      this.set('errorMessage', 'The given password is incorrect.');
    } else
    if (error.code === "auth/invalid-email") {
      this.set('errorMessage', error.message);
    } else {
      this.set('errorMessage', 'Something went wrong. Please try again.');
    }
  }
});
