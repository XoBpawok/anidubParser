var Dispatcher = require('dispatcher'),
  Const = require('const'),
  Actions = require('actions'),

  $ = require('jquery'),
  Backbone = require('backbone'),

  ItemModel = require('ItemModel');

Backbone.$ = $;

var ItemList = Backbone.Collection.extend({
  model: ItemModel,

  initialize: function() {
    var res = fetch('http://127.0.0.1:8888/');
    var self = this;
    res.then(function(response){
      return response.json()
    }).then(function(json){
      self.loadItems(json);
    });
  },

  loadItems: function(data) {
    this.add(data);
  }
});

var itemsList = new ItemList();

Dispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case Const.GET_ITEM_DETAILS:
      console.debug('GET_ITEM_DETAILS');
      var item = itemsList.get(action.id);
      item.fetchDetails();
      break;
    default:
      return true;
  }

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = itemsList;