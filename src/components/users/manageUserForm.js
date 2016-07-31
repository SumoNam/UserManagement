"use strict";

var React = require('react');
var Router = require('react-router');
var UserForm = require('./userForm');
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/userStore');
var toastr = require('toastr');
var Authentication = require('../authentication/authenticationMixins');

var ManageUserPage = React.createClass({
	mixins: [
		Authentication
	],

	statics: {
		willTransitionFrom: function(transition, component){
			if(component.state.dirty && !confirm('Leave without saving user?')){
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			user: { id: '', name: '', username: '', 
					email: '', password: '', 
					role: '', group: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var userId = this.props.params.id;

		if(userId){
			this.setState({user: UserStore.getUserById(userId)});
		}
	},

	setUserState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.user[field] = value;
		return this.setState({user: this.state.user});
	},

	userFormIsValid: function(){
		var formIsValid = true;
		this.state.errors = {}; 

		if(this.state.user.username.length === 0){
			this.state.errors.username = 'Please enter the username.';
			formIsValid = false;
		} else{
			if(UserStore.checkExistedUsername(this.state.user.username)){
				this.state.errors.username = 'This username is existed';
				formIsValid = false;
			}
		}

		if(this.state.user.email.length === 0){
			this.state.errors.email = 'Please enter the email.';
			formIsValid = false;
		} else {
			var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (!re.test(this.state.user.email)){
				this.state.errors.email = 'Invalid email.';
				formIsValid = false;
			} else if(UserStore.checkExistedEmail(this.state.user.email)){
				this.state.errors.email = 'This email is existed';
				formIsValid = false;
			}
		}

		if(this.state.user.role.length === 0){
			this.state.errors.role = 'Please enter the role';
			formIsValid = false;
		}

		if(this.state.user.group.length === 0 || this.state.user.group === 'N/A'){
			this.state.errors.group = 'Must choose at least 1 group';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveUser: function(event) {
		event.preventDefault();

		if (!this.userFormIsValid()) {
			return;
		}

		if (this.state.user.id) {
			UserActions.updateUser(this.state.user);
		} else {
			UserActions.createUser(this.state.user);
		}

		this.setState({dirty: false});
		toastr.success('user saved successfully.');
		this.transitionTo('users');
	},

	render: function() {
		return (
			<UserForm 
				user={this.state.user} 
				onChange={this.setUserState} 
				onSave={this.saveUser}
				errors={this.state.errors}/>
		);
	}
});

module.exports = ManageUserPage;