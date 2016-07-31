'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var GroupActions = require('../../actions/groupActions');

var GroupList = React.createClass({
	getInitialState: function(){
		return {
			selectedGroups: []
		};
	},

	PropTypes: {
		groups: React.PropTypes.array.isRequired
	},

	selectGroup: function(id, event){
		if(event.target.checked){
			this.state.selectedGroups.push(id);
			console.log('Selected groups ADD: ', this.state.selectedGroups);
		} else{
			var index = this.state.selectedGroups.indexOf(id);
			if(index !== -1) {
				this.state.selectedGroups.splice(index, 1);
			}
			console.log('Selected groups REMOVE: ', this.state.selectedGroups);
		}
		this.props.selectedGroupCallback(this.state.selectedGroups);
	},

	render: function() {
		var createGroupRow = function(group){
			if(group.name !== "N/A"){
				return (
					<tr key={group.id}>
						<td><input type="checkbox" onClick={this.selectGroup.bind(this, group.id)} value={group.id}/></td>
						<td>{group.name}</td>
						<td>{group.info}</td>
					</tr>
				);
			}
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th></th>
						<th>Name</th>
						<th>Info</th>
					</thead>
					<tbody>
						{this.props.groups.map(createGroupRow, this)}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = GroupList;