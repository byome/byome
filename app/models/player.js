import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  avatar: DS.attr('string'),

  // Associations
  user: DS.belongsTo('user'),
  servers: DS.hasMany('server'),
  connections: DS.hasMany('connection'),
  kills: DS.hasMany('kill'),
  deaths: DS.hasMany('death'),
  activities: DS.hasMany('activity', { inverse: null, async: true }),

  // Helpers
  killCount: Ember.computed('kills.[]', function() {
    return this.get('kills.[].length');
  }),
  deathCount: Ember.computed('deaths.[]', function() {
    return this.get('deaths.[].length')
  }),

  kdRatio: Ember.computed('killCount', 'deathCount', function() {
    if (this.get('deathCount') === 0 && this.get('killCount') > 0) {
      return this.get('killCount');
    } else
    if (this.get('deathCount') > this.get('killCount')) {
      return `-${this.get('deathCount')}`;
    } else
    if (this.get('deathCount') === 0 && this.get('killCount') === 0) {
      return 0;
    } else {
      let ratio = this.get('killCount') / this.get('deathCount');
      if (this._isInteger(ratio)) { return parseInt(ratio); }
      return ratio.toFixed(3);
    }
    if (ratio === "None" || ratio === Infinity || typeof ratio === NaN) {
      return 'None';
    }
    return ratio;
  }),

  _isInteger(num) {
    return Number(num) === num && num % 1 === 0;
  }
});
