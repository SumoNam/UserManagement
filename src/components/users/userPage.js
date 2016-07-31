'use strict';

var React = require('react');
var Link = require('react-router').Link;
var UserActions = require('../../actions/userActions');
var UserStore = require('../../stores/userStore');
var UserList = require('./userList');
var toastr = require('toastr');
var Authentication = require('../authentication/authenticationMixins');

var UserPage = React.createClass({
	mixins: [
		Authentication
	],

	getInitialState: function(){
		return {
			users: UserStore.getAllUsers(),
			selectedUsers: []
		};
	},
	
	componentWillMount: function() {
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		var newUsers = UserStore.getAllUsers();
		
		this.setState({ 
			users: newUsers,
			selectedUsers: []
		});
	},

	deleteUsers: function() {
		UserActions.deleteUsers(this.state.selectedUsers);
		toastr.success('User(s) Deleted Successfully');
	},

	deleteUsersFromGroups: function() {
		if(this.state.selectedUsers.length > 0){
			UserActions.deleteUsersFromGroups(this.state.selectedUsers);
			toastr.success('User(s) From Group Deleted Successfully');
		}
	},

	onSelectedUsersChanged: function(selectedUsers){
		this.state.selectedUsers = selectedUsers;
		console.log('Selected users CALLBACK in PARENT: ', this.state.selectedUsers);
	},

	render: function() {
		return (
			<div>
				<h1 className="user-management-icon"><img src="../../images/user.png"/></h1>
				<div className="btn-group-wrap">
					<div className="btn-group">
						<Link to="addUser" className="btn btn-primary btn-md"><i className="fa fa-user-plus"></i>&nbsp;<span className="hidden-xs">add user</span></Link>
						<button type="button" className="btn btn-danger btn-md" onClick={this.deleteUsers}><i className="fa fa-user-times"></i>&nbsp;<span className="hidden-xs">remove user(s)</span></button>
						<button type="button" className="btn btn-warning btn-md" onClick={this.deleteUsersFromGroups}><i className="fa fa-users"></i>&nbsp;<span className="hidden-xs">remove from group</span></button>
					</div>
				</div>
				<UserList users={this.state.users} selectedUserCallback={this.onSelectedUsersChanged}/>
			</div>
		);
	}
});

module.exports = UserPage;