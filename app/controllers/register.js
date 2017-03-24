import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service('firebaseApp'),

  registering: false,
  errorMessage: null,

  createUser(user, firebaseUID) {
    const { email, name, username } = user.getProperties('email', 'name', 'username');
    let newUser = this.get('store').createRecord('user', {
      email: email,
      name: name,
      username: username
    });
    newUser.set('id', firebaseUID);
    this.set('registering', false);
    return newUser.save();
  },

  handleErrors(error) {
    const genericError = "Something went wrong. Please try again.";
    const firebaseErrors = {
      "auth/email-already-in-use": "Email address already in use.",
      "auth/weak-password": "The given password is too weak.",
      "auth/invalid-email": error.message,
    };
    this.set('errorMessage', firebaseErrors[error.code] || genericError);
    this.set('registering', false);
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

  actions: {
    signUp(user) {
      this.set('registering', true);
      const { email, password } = user.getProperties('email', 'password');
      this.get('firebaseApp').auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => this.createUser(user, data.uid))
        .then(() => this.clearUserForm(user))
        .then(() => this.transitionToRoute('login'))
        .catch(this.handleErrors.bind(this));
    }
  }
});
