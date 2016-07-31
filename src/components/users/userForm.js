"use strict";

var React = require('react');
var Input = require('../common/textInput');
var DropdownlistInput = require('../common/dropdownlistInput');
var GroupStore = require('../../stores/groupStore');

var UserForm = React.createClass({
	propTypes: {
		user: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	getInitialState: function() {
		return {
			groups: {}
		};
	},

	componentWillMount: function() {
		this.setState({
			groups: GroupStore.getAllGroups()
		});
	},

	render: function() {
		return (
			<form>
				<h1>Add User</h1>

				<Input
					name="username" 
					label="Username"
					type="text"
					value={this.props.user.username}
					onChange={this.props.onChange}
					error={this.props.errors.username}/>
				<br/>

				<Input
					name="email" 
					label="Email"
					type="text"
					value={this.props.user.email}
					onChange={this.props.onChange}
					error={this.props.errors.email}/>
				<br/>

				<Input
					name="password" 
					label="Password"
					type="password"
					value={this.props.user.password}
					onChange={this.props.onChange}
					error={this.props.errors.password}/>
				<br/>

				<Input
					name="role" 
					label="Role"
					type="text"
					value={this.props.user.role}
					onChange={this.props.onChange}
					error={this.props.errors.role}/>
				<br/>

				<DropdownlistInput 
					name="group" 
					label="Group"
					groups={this.state.groups} 
					error={this.props.errors.group} 
					onChange={this.props.onChange}/>
				<br/>
				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = UserForm;