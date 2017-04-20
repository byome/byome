import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['nav', 'navbar-nav', 'float-lg-right', 'mai-user-nav'],

  session: Ember.inject.service('session'),
  user: Ember.computed.alias('session.userModel'),

  actions: {
    logout() {
      this.get('session').close().then(() => {
        window.location = '/'; // TODO: CAN IT BE DONE?!?!
      });
    }
  }
});
