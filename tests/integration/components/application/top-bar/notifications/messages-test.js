import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('application/top-bar/notifications/messages', 'Integration | Component | application/top bar/notifications/messages', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{application/top-bar/notifications/messages}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#application/top-bar/notifications/messages}}
      template block text
    {{/application/top-bar/notifications/messages}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
