import Ember from 'ember';
import VendorTemplate from 'byome/utils/vendor_template';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ['header', 'white-bg'],

  didInsertElement() {
    VendorTemplate.initializeTemplate();
  }
});
