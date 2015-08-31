/** @jsx React.DOM */

'use strict';

var React = require('react'),
  Store = require('store'),
  Actions = require('actions'),
  ListItem = require('components/primitives/listItem');


var BackboneMixin = {
  componentDidMount: function() {
    // Whenever there may be a change in the Backbone data, trigger a reconcile.
    this.getBackboneModels().forEach(function(model) {
      model.on('add change remove', this.forceUpdate.bind(this, null), this);
    }, this);
  },

  componentWillUnmount: function() {
    // Ensure that we clean up any dangling references when the component is
    // destroyed.
    this.getBackboneModels().forEach(function(model) {
      model.off(null, null, this);
    }, this);
  }
};



var ItemsList = React.createClass({
  mixins: [BackboneMixin],
  list: null,

  getInitialState: function() {
    this.list = Store;
    return null;
  },

  getBackboneModels: function() {
    return this.list;
  },
  render: function() {
    var listItems = this.list.map(function(item) {
      return (<ListItem item={item} />);
    }, this);

    return ( 
      <div className="list-wrapper">
        <div className="list-title">Parsed data:</div>
        <div className="list-content">{listItems}</div>
      </div>
    );
  }
});

module.exports = ItemsList;