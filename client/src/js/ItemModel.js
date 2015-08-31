var Dispatcher = require('dispatcher'),
  Const = require('const'),
  Actions = require('actions'),

  $ = require('jquery'),
  Backbone = require('backbone');

Backbone.$ = $;

var ItemModel = Backbone.Model.extend({
  defaults: {
    id: NaN,
    title: '',
    details: null,
  },

  initialize: function(data) {
    this.set({
      id: data.id,
      title: data.title
    })
  },

  fetchDetails: function() {
    var id = this.get('id');
    this.set({
      details: 'details' + id
    });
  }
});

module.exports = ItemModel;