import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('application/top-bar/user', 'Integration | Component | application/top bar/user', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{application/top-bar/user}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#application/top-bar/user}}
      template block text
    {{/application/top-bar/user}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
