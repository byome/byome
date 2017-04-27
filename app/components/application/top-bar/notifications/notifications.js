import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown', 'nav-item', 'mai-notifications'],

  session: Ember.inject.service('session'),
  user: Ember.computed.alias('session.userModel'),
});
