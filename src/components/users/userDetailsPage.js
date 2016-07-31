"use strict";

var React = require('react');
var DropdownlistInput = require('../common/dropdownlistInput');
var UserActions = require('../../actions/UserActions');
var UserStore = require('../../stores/userStore');
var GroupStore = require('../../stores/groupStore');
var toastr = require('toastr');
var Authentication = require('../authentication/authenticationMixins');

var UserDetailsPage = React.createClass({
	mixins: [
		Authentication
	],

	getInitialState: function() {
		return {
			user: { id: '', username: '', email: '', role: '', group: '' },
			groups: {}
		};
	},

	setGroup: function(event) {
		var field = event.target.name;
		var value = event.target.value;
		this.state.user[field] = value;
		return this.setState({user: this.state.user});
	},

	componentWillMount: function() {
		var userId = this.props.params.id;

		if(userId){
			this.setState({
				user: UserStore.getUserById(userId),
				groups: GroupStore.getAllGroups()
			});
		}
	},

	updateUser: function(event) {
		event.preventDefault();

		if (this.state.user.id) {
			UserActions.updateUser(this.state.user);
		}

		toastr.success('user update successfully.');
		this.transitionTo('users');
	},

	render: function() {
		var currentUser = this.state.user;

		return (
			<form>
				<div className="panel-body">
					<div className="row">
						<div className="col-md-3 col-lg-3 " align="center"> <img alt="User Pic" src="../../images/avatar.png" className="img-circle img-responsive"/> </div>
						<div className=" col-md-9 col-lg-9 "> 
							<table className="table table-user-information">
								<tbody>
									<tr>
										<td>Username</td>
										<td>{currentUser.username}</td>
									</tr>
									<tr>
										<td>Email</td>
										<td><a href="mailto:{currentUser.email}">{currentUser.email}</a></td>
									</tr>
									<tr>
										<td>Role</td>
										<td>{currentUser.role}</td>
									</tr>
									<tr>
										<td>Group</td>
										<td><DropdownlistInput noLabel="hidden" name="group" groups={this.state.groups} value={currentUser.group} onChange={this.setGroup}/></td>
									</tr>
								</tbody>
							</table>
							<input type="submit" value="Update" className="btn btn-primary" onClick={this.updateUser} />
						</div>
					</div>
				</div>
			</form>
		);
	}
});

module.exports = UserDetailsPage;