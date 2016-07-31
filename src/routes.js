'use strict';

var React = require('react');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var App = require('./components/app');
var HomePage = require('./components/homePage');
var Users = require('./components/users/userPage');
var ManageUserForm = require('./components/users/manageUserForm');
var UserDetails = require('./components/users/userDetailsPage');
var Groups = require('./components/groups/groupPage');
var ManageGroupForm = require('./components/groups/manageGroupForm');

var routes = (
	<Route name="app" path="/" handler={App}>
		<DefaultRoute handler={HomePage} />
		<Route name="login" path="/login" handler={HomePage} />
		<Route name="users" path="users" handler={Users} />
		<Route name="addUser" path="user" handler={ManageUserForm}/>
		<Route name="manageUser" path="user/:id" handler={ManageUserForm}/>
		<Route name="userDetails" path="userdetails/:id" handler={UserDetails}/>
		<Route name="groups" handler={Groups} />
		<Route name="addGroup" path="group" handler={ManageGroupForm}/>\
		<Route name="manageGroup" path="group/:id" handler={ManageGroupForm}/>
	</Route>
);

module.exports = routes;