import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  },

  title(tokens) {
    return (tokens.length ? tokens.reverse().join(' - ') + ' - ' : '') + 'byome';
  },

  actions: {
    accessDenied() {
      this.transitionTo('login');
    }
  }
});
