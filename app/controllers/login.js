import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    signIn(user) {
      this.get('session').open('firebase', {
        provider: 'password',
        email: user.get('email'),
        password: user.get('password')
      }).then((data) => {
        console.log(data);
        console.log(this.get('session'));
        this.transitionToRoute('index');
      });
    },

    resetPassword(user) {
      console.log(user.get('email'));
    }
  }
});
