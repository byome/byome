import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  session: Ember.inject.service('session'),

  canEdit: Ember.computed('session.userModel', function() {
    return false;
  })
});
