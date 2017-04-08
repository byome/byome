import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsAdmin: Ember.computed.alias('session.userModel.isAdmin'),
  userIsPurchaser: Ember.computed.equal('session.userModel.id', 'model.user'),

  canCreate: true,
  canEdit: Ember.computed.alias('userIsAdmin'),
  canDestroy: Ember.alias('userIsAdmin')
});
