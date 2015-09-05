/** @jsx React.DOM */

'use strict';

var React = require('react'),
  Store = require('store'),
  Actions = require('actions'),
  List = require('components/primitives/list');

var Home = React.createClass({
  render: function() {
    return (<List items={Store} />);
  }
});

module.exports = Home;