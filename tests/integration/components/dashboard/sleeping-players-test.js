import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dashboard/sleeping-players', 'Integration | Component | dashboard/sleeping players', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{dashboard/sleeping-players}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#dashboard/sleeping-players}}
      template block text
    {{/dashboard/sleeping-players}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
