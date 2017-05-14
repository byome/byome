import Ember from 'ember';

export default Ember.Controller.extend({
  firebaseApp: Ember.inject.service('firebaseApp'),
  raven: Ember.inject.service('raven'),
  metrics: Ember.inject.service('metrics'),

  registering: false,
  errorMessage: null,

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

  handleErrors(error) {
    this.get('raven').captureException(error);
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
    this.set('errorMessage', firebaseErrors[error.code] || firebaseArgumentErrors[error.message] || otherErrors[error.code] || genericError);
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
    this.set('registering', false);
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

  actions: {
    signUp(user) {
      const { email, password } = user.getProperties('email', 'password');
      this.createFirebaseUser(email, password)
        .then(data => this.buildUser(user, data.uid))
        .then(user => this.saveUser(user))
        .then(user => this.trackNewUserEvent(user))
        .then(() => this.clearUserForm(user))
        .then(() => this.transitionToRoute('home.dashboard'))
        .catch(errors => this.handleErrors(errors));
    }
  }
});
