'use strict';

var React = require('react');
var Link = require('react-router').Link;
var GroupActions = require('../../actions/groupActions');
var GroupStore = require('../../stores/groupStore');
var GroupList = require('./groupList');
var toastr = require('toastr');
var Authentication = require('../authentication/authenticationMixins');

var GroupPage = React.createClass({
	mixins: [
		Authentication
	],

	getInitialState: function(){
		return {
			groups: GroupStore.getAllGroups(),
			selectedGroups: []
		};
	},

	componentWillMount: function() {
		GroupStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		GroupStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		var newGroups = GroupStore.getAllGroups();
		
		this.setState({ 
			groups: newGroups,
			selectedGroups: []
		});
	},

	deleteGroups: function() {
		GroupActions.deleteGroups(this.state.selectedGroups);
		toastr.success('Group(s) Deleted Successfully');
	},

	onSelectedGroupsChanged: function(selectedGroups){
		this.state.selectedGroups = selectedGroups;
		console.log('Selected groups CALLBACK in PARENT: ', this.state.selectedGroups);
	},

	render: function() {
		return (
			<div>
				<h1 className="user-management-icon"><img src="../../images/teamwork.png"/></h1>
				<div className="btn-group-wrap">
					<div className="btn-group">
						<Link to="addGroup" className="btn btn-primary btn-md"><i className="fa fa-plus"></i>&nbsp;<span className="hidden-xs">add group</span></Link>
						<button type="button" className="btn btn-danger btn-md" onClick={this.deleteGroups}><i className="fa fa-trash-o"></i>&nbsp;<span className="hidden-xs">remove group(s)</span></button>
					</div>
				</div>
				<GroupList groups={this.state.groups} selectedGroupCallback={this.onSelectedGroupsChanged}/>
			</div>
		);
	}
});

module.exports = GroupPage;