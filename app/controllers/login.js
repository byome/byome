import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    signIn(user) {
      const { email, password } = user.getProperties('email', 'password');
      this.get('session').open('firebase', {
        provider: 'password',
        email: email,
        password: password
      }).then(() => {
        this.transitionToRoute('dashboard');
      });
    },

    resetPassword(user) {
      console.log(user.get('email'));
    }
  }
});
