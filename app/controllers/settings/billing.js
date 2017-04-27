import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  stripe: Ember.inject.service('stripe'),
  user: Ember.computed.alias('session.userModel'),

  success: null,
  errors: null,
  submitting: false,

  expMonth: Ember.computed('expiration', function() {
    return this.get('expiration').split('/')[0];
  }),

  expYear: Ember.computed('expiration', function() {
    return this.get('expiration').split('/')[1];
  }),

  actions: {
    saveBillingInfo() {
      this.set('submitting', true);
      const number = this.get('number');
      const cvc = this.get('cvc');
      const exp_month = this.get('expMonth');
      const exp_year = this.get('expYear');

      // TODO: Add proper masking and validations
      if (!exp_month || !exp_year || exp_month.length < 2 || exp_year < 2) {
        this.set('errors', "Expiration must be in format of mm/yy");
        this.set('success', false);
        this.set('submitting', false);
        return;
      } else {
        this.get('stripe').card.createToken({ number, cvc, exp_month, exp_year })
        .then((response) => {
          if (response && response.id) {
            this.get('user').set('stripeCardToken', response.id);
            this.get('user').save();
          }
        })
        .then(() => {
          this.set('number', '');
          this.set('cvc', '');
          this.set('expiration', '');
          this.set('submitting', false);
          this.set('success', true);
          this.set('errors', null);
        })
        .catch((response) => {
          this.set('errors', "There was an error. Double check your card information and try again.");
          this.set('submitting', false);
          this.set('success', false);
          this.get('raven').captureException(response);
        });
      }
    }
  }
});
