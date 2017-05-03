import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['row'],

  kills: null,
  killFeed: Ember.computed('kills', function() {
    return this.get('kills').toArray().reverse();
  })
});
