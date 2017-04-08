import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsAdmin: Ember.computed.alias('session.currentUser.isAdmin'),
  userIsSelf: Ember.computed.equal('session.currentUser.id', 'model.id'),

  canEdit: Ember.computed('userIsAdmin', 'userIsSelf', function() {
    return this.get('userIsAdmin') || this.get('userIsSelf');
  })
});
