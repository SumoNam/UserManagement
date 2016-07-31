"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
	render: function() {
		return (
			<nav className= "navbar navbar-default" role="navigation">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>

					<a className="navbar-brand" href="#">User Management System</a>
				</div>

				<div className="collapse navbar-collapse" id="example-navbar-collapse">
					<ul className = "nav navbar-nav">
						<li className = "active"><Link to="users">Users</Link></li>
						<li><Link to="groups">Groups</Link></li>
					</ul>
				</div>
			</nav>
		);
	}
});

module.exports = Header;