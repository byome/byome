import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['coming-soon-background'],
  classNameBindings: ['randomClass'],

  randomNumber: Ember.computed(function() {
    return Math.floor(Math.random() * (4-0+1));
  }),

  randomClass: Ember.computed('randomNumber', function() {
    return `coming-soon-background-photo-${this.get('randomNumber')}`;
  }),
});
