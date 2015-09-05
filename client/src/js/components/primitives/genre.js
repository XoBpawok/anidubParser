/** @jsx React.DOM */

'use strict';

var React = require('react');

var Genre = React.createClass({
  render: function() {
    return (
      <span className="genre">{this.props.genre}</span>
    );
  }
});

module.exports = Genre;