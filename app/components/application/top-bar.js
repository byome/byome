import Ember from 'ember';
import FlatLab from 'byome/utils/flat-lab';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ['header', 'white-bg'],

  didInsertElement() {
    FlatLab.initializeTopbarPlugins();
  }
});
