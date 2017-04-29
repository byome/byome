import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),

  tagName: 'nav',
  classNames: [
    'navbar',
    'navbar-full',
    'navbar-inverse',
    'navbar-fixed-top',
    'mai-top-header',
    'mai-top-header-show-logo'
  ],

  didInsertElement() {
    Ember.run(() => App.init());
  }
});
