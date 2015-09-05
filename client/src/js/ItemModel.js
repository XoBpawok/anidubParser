var Dispatcher = require('dispatcher'),
  Const = require('const'),
  Actions = require('actions'),

  $ = require('jquery'),
  Backbone = require('backbone');

Backbone.$ = $;

var ItemModel = Backbone.Model.extend({
  defaults: {
    id: '',
    title: '',
    details: null,
  },

  initialize: function(data) {
    var id = data.link.split('/');
    id = id[id.length - 1].split('.')[0];
    data.id = id;
    this.set(data);
  },

  fetchDetails: function() {
    var id = this.get('id');
    this.set({
      details: 'details' + id
    });
  }
});

module.exports = ItemModel;