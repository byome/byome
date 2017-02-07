import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service('firebaseApp'),

  createUser(user, firebaseUID) {
    const { email, name, username } = user.getProperties('email', 'name', 'username');
    let newUser = this.get('store').createRecord('user', {
      email: email,
      name: name,
      username: username,
      firebaseUID: firebaseUID
    });
    return newUser.save();
  },

  actions: {
    signUp(user) {
      const { email, password } = user.getProperties('email', 'password');
      this.get('firebaseApp').auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => this.createUser(user, data.uid))
        .then(() => this.transitionToRoute('login'))
        .catch((error) => {
          console.log(error);
        });
    }
  }
});
