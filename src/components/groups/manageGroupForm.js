"use strict";

var React = require('react');
var Router = require('react-router');
var GroupForm = require('./groupForm');
var GroupActions = require('../../actions/groupActions');
var GroupStore = require('../../stores/groupStore');
var toastr = require('toastr');
var Authentication = require('../authentication/authenticationMixins');

var ManageGroupPage = React.createClass({
	mixins: [
		Authentication
	],

	statics: {
		willTransitionFrom: function(transition, component){
			if(component.state.dirty && !confirm('Leave without saving group?')){
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			group: { id: '', name: '', info: '' },
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var groupId = this.props.params.id;

		if(groupId){
			this.setState({group: GroupStore.getGroupById(groupId)});
		}
	},

	setGroupState: function(event) {
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.group[field] = value;
		return this.setState({group: this.state.group});
	},

	groupFormIsValid: function(){
		var formIsValid = true;
		this.state.errors = {};

		if(this.state.group.name.length === 0){
			this.state.errors.name = 'Please enter the group name.';
			formIsValid = false;
		} else{
			if(GroupStore.checkExistedGroup(this.state.group.name)){
				this.state.errors.name = 'This group is existed';
				formIsValid = false;
			}
		}

		if(this.state.group.info.length < 3){
			this.state.errors.info = 'Group info must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveGroup: function(event) {
		event.preventDefault();

		if (!this.groupFormIsValid()) {
			return;
		}

		if (this.state.group.id) {
			GroupActions.updateGroup(this.state.group);
		} else {
			GroupActions.createGroup(this.state.group);
		}

		this.setState({dirty: false});
		toastr.success('Group saved successfully.');
		this.transitionTo('groups');
	},

	render: function() {
		return (
			<GroupForm 
				group={this.state.group} 
				onChange={this.setGroupState} 
				onSave={this.saveGroup}
				errors={this.state.errors}/>
		);
	}
});

module.exports = ManageGroupPage;