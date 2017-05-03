import Ember from 'ember';

export default Ember.Controller.extend({
  activities: Ember.computed.alias('model.activities.[]')
});
