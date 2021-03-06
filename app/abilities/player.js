import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  userIsSelf: Ember.computed.equal('session.userModel.id', 'model.user'),
  userIsAdmin: Ember.computed('session.userModel', function() {
    return this.get('session.userModel.isAdmin');
  }),

  canIndex: true,
  canShow: true,
  canEdit: Ember.computed.or('userIsAdmin', 'userIsSelf')
});
