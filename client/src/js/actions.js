var Dispatcher = require('dispatcher');
var Const = require('const');

var Actions = {

  getList: function() {
    Dispatcher.handleViewAction({
      'actionType': Const.GET_LIST
    });
  },

  getItemDetails: function(id) {
    Dispatcher.handleViewAction({
      'actionType': Const.GET_ITEM_DETAILS,
      'id': id
    });
  }
};

module.exports = Actions;