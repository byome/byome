import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsSelf: Ember.computed('session.userModel.id', 'model.id', function() {
    return this.get('session.userModel.id') === this.get('model.id');
  }),
  userIsAdmin: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.isAdmin') === 'true';
  }),
  userHasStripe: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.stripeCardToken') === 'true';
  }),
  userHasPlayer: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.player') === null;
  }),

  canCreate: true,
  canEdit: Ember.computed('userIsAdmin', 'userIsSelf', function() {
    return this.get('userIsAdmin') || this.get('userIsSelf');
  }),
  canUpdateStripe: Ember.computed('userIsAdmin', 'userIsSelf', 'userHasStripe', function() {
    return !this.get('userHasStripe') && (this.get('userIsAdmin') || this.get('userIsSelf'));
  }),
  canLinkAccount: Ember.computed('userIsSelf', 'userHasPlayer', function() {
    return this.get('userIsSelf') && !this.get('userHasPlayer');
  })
});
