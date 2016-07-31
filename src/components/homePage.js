"use strict";

var React = require('react');
var Router = require('react-router');
var UserStore = require('../stores/userStore');
var UserActions = require('../actions/userActions');
var LoginForm = require('./authentication/loginForm');
var toastr = require('toastr');
var Link = Router.Link;

var Home = React.createClass({
	mixins: [
		Router.Navigation
	],

	getInitialState: function() {
		return {
			user: { username: '', password: ''},
			errors: {}
		};
	},

	componentWillMount: function() {
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		var loggedIn = UserStore.isLoggedIn();

		console.log("&*&*&* App onLoginChange event: loggedIn=", 
			loggedIn, "nextTransitionPath=", 'users');

		if(loggedIn){
			this.transitionTo('users');
		}else{
			toastr.error('The user info you have enter in not existed');
		}
	},

	handleSubmit: function(event) {
		event.preventDefault();
		UserActions.checkLoginUser(this.state.user.username, this.state.user.password);
	},

	setUserState: function(event) {
		var field = event.target.name;
		var value = event.target.value;
		this.state.user[field] = value;
		return this.setState({user: this.state.user});
	},


	render: function() {
		return (
			<div>
				<LoginForm 
					handleSubmit={this.handleSubmit}
					user={this.state.user} 
					onChange={this.setUserState} 
					onSave={this.saveUser}
					errors={this.state.errors}/>
			</div>
		);
	}
});

module.exports = Home;