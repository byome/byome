import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown'],
  elementId: 'header_notification_bar',

  session: Ember.inject.service('session'),
  user: Ember.computed.alias('session.userModel'),
});
