/** @jsx React.DOM */
'use strict';

/*
Views ---> (actions) ----> Dispatcher ---> (registered callback) ---> Stores -------+
Ʌ                                                                                   |
|                                                                                   V
+-- (Controller-Views "change" event handlers) ---- (Stores emit "change" events) --+
*/

var React = require('react'),
  Router = require('react-router'),
  Routes = Router.Routes,
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute;

// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;


var App = React.createClass({
  render: function() {
    return (<Router.RouteHandler />);
  }
});

var routes = {
    Home: require('components/pages/home'),
    ItemDetails: require('components/pages/itemDetails')
};

var routes = (
    <Router.Route name="app" path="/" handler={App}>
        <Router.Route name="itemsList" path="/" handler={routes.Home} />
        <Router.Route name="itemDetails" path="item/:id" handler={routes.ItemDetails} />
    </Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.querySelector('#spa'));
});