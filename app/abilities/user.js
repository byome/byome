import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsSelf: Ember.computed.equal('session.userModel.id', 'model.id'),
  userIsAdmin: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.isAdmin');
  }),
  userHasStripe: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.stripeCardToken') === 'true';
  }),

  canEdit: Ember.computed('userIsAdmin', 'userIsSelf', function() {
    return this.get('userIsAdmin') || this.get('userIsSelf');
  }),
  canUpdateStripe: Ember.computed('userIsAdmin', 'userIsSelf', 'userHasStripe', function() {
    return !this.get('userHasStripe') && (this.get('userIsAdmin') || this.get('userIsSelf'));
  })
});
