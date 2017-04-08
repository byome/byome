import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  errorMessage: null,

  actions: {
    signIn(user) {
      const { email, password } = user.getProperties('email', 'password');
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(() => {
        this.transitionToRoute('dashboard');
      }).catch(this.handleErrors.bind(this));
    },

    resetPassword(user) {
      console.log(user.get('email'));
    }
  },

  handleErrors(error) {
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
