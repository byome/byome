import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: [
    'navbar',
    'navbar-full',
    'navbar-inverse',
    'navbar-fixed-top',
    'mai-top-header'
  ],

  didInsertElement() {
    Ember.run(() => App.init());
  }
});
