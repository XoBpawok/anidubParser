/** @jsx React.DOM */

'use strict';

var React = require('react'),
  Actions = require('actions'),
  Store = require('store');

var Settings = {
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      Actions.getItemDetails(params.id);
      callback();
    }
  }
};


var ItemDetails = React.createClass({
  mixins: [Settings],

  getInitialState: function() {
    return Store.get(this.props.params.id).toJSON();
  },

  render: function() {
    return (
      <div className="item-description-wrapper">
        <div className="item-description-title">Parsed data:</div>
        <div className="item-description-content">{this.state.details}</div>
      </div>
    );
  }
});

module.exports = ItemDetails;