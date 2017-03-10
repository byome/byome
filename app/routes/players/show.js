import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('player', params.player_id);
  },

  titleToken(model) {
    return model.get('name');
  }
});
