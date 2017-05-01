import Ember from 'ember';
import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  name: validator('presence', true),
  username: validator('presence', true),
  password: [
    validator('presence', true),
    validator('length', {
      min: 8,
      max: 100
    })
  ],

  passwordConfirmation: [
    validator('presence', true),
    validator('confirmation', {
      on: 'password',
      message: '{description} does not match',
      description: 'Password confirmation'
    })
  ]
});

export default DS.Model.extend(Validations, {
  email: DS.attr('string'),
  name: DS.attr('string'),
  username: DS.attr('string'),
  role: DS.attr('string'),
  createdAt: DS.attr('date', {
    defaultValue() { return (new Date().toJSON()); }
  }),

  referralToken: DS.attr('string'),
  associationToken: DS.attr('string'),
  stripeCardToken: DS.attr('string'),

  // Associations
  player: DS.belongsTo('player'),
  purchases: DS.hasMany('purchase'),

  // Helpers
  isAdmin: Ember.computed.equal('role', 'admin')
});
