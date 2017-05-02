import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['widget', 'widget-indicators'],
  model: null,

  totalOnlinePlayers: Ember.computed.alias('model.onlinePlayers.[].length'),
  totalOfflinePlayers: Ember.computed.alias('model.inactivePlayers.[].length'),
  totalKills: Ember.computed.alias('model.kills.[].length'),
  totalDeaths: Ember.computed.alias('model.deaths.[].length')
});
