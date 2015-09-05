/** @jsx React.DOM */

'use strict';

var React = require('react'),
  Link = require('react-router').Link,
  Genre = require('./genre');

var ListItem = React.createClass({

  getInitialState: function() {
    return this.props.item.toJSON();
  },

  render: function() {
    var genres = this.state.genres ? this.state.genres.map(function(item) {
      return (<Genre genre={item} />)
    }) : '';

    return (
      <div className="list-item-wrapper">
        <div className="list-item-title">
          <a href={this.state.link} target="_blank">{this.state.title}</a>
        </div>
        <div className="list-item-rating">
          {this.state.rating}
        </div>
        <div className="list-item-type">
          <a href={this.state.typeLink} target="_blank">{this.state.type}</a>
        </div>
        <div className="list-item-year">
          {this.state.year}
        </div>
        <div className="list-item-genre">
          {genres}
        </div>
        <div className="list-item-last-update">
          {this.state.lastUpdate}
        </div>
        <div className="list-item-series">
          {this.state.series}
        </div>
        <div className="list-item-date">
          {this.state.year}
        </div>
        <Link to="itemDetails" params={{id: this.state.id}}>Details</Link>
      </div>
    );
  }
});

module.exports = ListItem;