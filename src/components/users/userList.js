'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');
var UserActions = require('../../actions/userActions');

var UserList = React.createClass({
	getInitialState: function(){
		return {
			selectedUsers: []
		};
	},

	PropTypes: {
		users: React.PropTypes.array.isRequired
	},

	deleteUsers: function(id, event) {
		event.preventDefault();
		UserActions.deleteUsers(id);
		toastr.success('User Deleted Successfully');
	},

	selectUser: function(id, event){
		if(event.target.checked){
			this.state.selectedUsers.push(id);
			console.log('Selected users ADD: ', this.state.selectedUsers);
		} else{
			var index = this.state.selectedUsers.indexOf(id);
			if(index !== -1) {
				this.state.selectedUsers.splice(index, 1);
			}
			console.log('Selected users REMOVE: ', this.state.selectedUsers);
		}
		this.props.selectedUserCallback(this.state.selectedUsers);
	},


	render: function() {
		var createUserRow = function(user){
			return (
				<tr key={user.id}>
					<td><input type="checkbox" onClick={this.selectUser.bind(this, user.id)} value={user.id}/></td>
					<td><Link to="userDetails" params={{id: user.id}}>{user.username}</Link></td>
					<td>{user.email}</td>
					<td>{user.role}</td>
					<td>{user.group}</td>
				</tr>
			);
		};
		return (
			<div>
				<table className="table">
					<thead>
						<th></th>
						<th>Username</th>
						<th>Email</th>
						<th>Role</th>
						<th>Group</th>
					</thead>
					<tbody>
						{this.props.users.map(createUserRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = UserList;