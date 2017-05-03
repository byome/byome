import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feed', 'Integration | Component | activity-feed/feed', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{feed}}`);

  assert.equal(this.$().text().trim(), '');

  assert.equal(this.$().text().trim(), 'template block text');
});
