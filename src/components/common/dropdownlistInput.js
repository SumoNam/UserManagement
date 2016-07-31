"use strict";

var React = require('react');

var DropdownlistInput = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		value: React.PropTypes.string,
		error: React.PropTypes.string,
		label: React.PropTypes.string,
		onChange: React.PropTypes.func.isRequired,
		noLabel: React.PropTypes.string
	},
	
	render: function() {
		var createOptions = function(group){
			var selected = group.id === this.props.value;
			
			return (
				<option key={group.id} value={group.id} selected={selected}>{group.name}</option>
			);
		};

		var wrapperClass = 'form-group';
		if(this.props.error && this.props.error.length > 0){
			wrapperClass += " " + 'has-error';
		}
		return (
			<div className={wrapperClass}>
				<label htmlFor={this.props.name} className={this.props.noLabel}>{this.props.label}</label>
				<div className="field">
					<select name={this.props.name} className="form-control" onChange={this.props.onChange}>
						{this.props.groups.map(createOptions, this)}
					</select>
					<div className="input">{this.props.error}</div>
				</div>
			</div>
		);
	}
});

module.exports = DropdownlistInput;