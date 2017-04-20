import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('application/main-menu/search', 'Integration | Component | application/main menu/search', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{application/main-menu/search}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#application/main-menu/search}}
      template block text
    {{/application/main-menu/search}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
