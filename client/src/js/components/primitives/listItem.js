/** @jsx React.DOM */

'use strict';

var React = require('react'),
  Link = require('react-router').Link;

var ListItem = React.createClass({
  getInitialState: function() {
    return this.props.item.toJSON();
  },

  render: function() {
    return (
      <div className="list-item-wrapper">
        <div className="list-item-title">{this.state.title}</div>
        <Link to="itemDetails" params={{id: this.state.id}}>Details</Link>
      </div>
    );
  }
});

module.exports = ListItem;