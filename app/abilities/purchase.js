import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsPurchaser: Ember.computed.equal('session.userModel.id', 'model.user'),
  userIsAdmin: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.isAdmin');
  }),
  userHasStripe: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.stripeCardToken') === true;
  }),

  canCreate: Ember.computed.alias('userHasStripe'),
  canEdit: Ember.computed.alias('userIsAdmin'),
  canDestroy: Ember.computed.alias('userIsAdmin')
});
