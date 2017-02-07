import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'dropdown',

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
