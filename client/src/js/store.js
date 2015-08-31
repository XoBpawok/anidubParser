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
    this.loadItems([
        {
          id: 0,
          title: 'title0'
        },
        {
          id: 1,
          title: 'title1'
        },
        {
          id: 2,
          title: 'title2'
        },
        {
          id: 3,
          title: 'title3'
        },
        {
          id: 4,
          title: 'title4'
        },
      ]);
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