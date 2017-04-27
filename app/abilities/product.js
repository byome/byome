import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsAdmin: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.isAdmin');
  }),
  userHasStripe: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.stripeCardToken') === 'true';
  }),

  canIndex: true,
  canShow: true,
  canCreate: Ember.computed.alias('userIsAdmin'),
  canEdit: Ember.computed.alias('userIsAdmin'),
  canPurchase: Ember.computed.alias('userHasStripe')
});
