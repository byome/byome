import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsSelf: Ember.computed.equal('session.userModel.id', 'model.id'),
  userIsAdmin: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.isAdmin');
  }),

  canEdit: Ember.computed('userIsAdmin', 'userIsSelf', function() {
    return this.get('userIsAdmin') || this.get('userIsSelf');
  })
});
