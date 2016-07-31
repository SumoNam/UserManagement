"use strict";

var React = require('react');
var Input = require('../common/textInput');

var GroupForm = React.createClass({
	propTypes: {
		group: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function() {
		return (
			<form>
				<h1>Add Group</h1>

				<Input
					name="name" 
					label="Group name"
					value={this.props.group.name}
					onChange={this.props.onChange}
					error={this.props.errors.name}/>
				<br/>

				<Input
					name="info" 
					label="Group info"
					value={this.props.group.info}
					onChange={this.props.onChange}
					error={this.props.errors.info}/>
				<br/>
				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = GroupForm;