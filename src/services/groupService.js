"use strict";

var data = require('./data');
var _ = require('lodash');

var GroupService = function() {
	var groups = JSON.parse(localStorage.getItem('groups')) || data.groups;

	function _storeGroups(groupsList){
		localStorage.setItem('groups', JSON.stringify(groupsList));
	}

	function getAllGroups(){
		return groups;
	}

	function saveGroup(group){
		console.log('Saved the group to the DB via AJAX Call');
		if (group.id) {
			var existingGroupIndex = _.indexOf(groups, _.find(groups, {id: group.id}));
			groups.splice(existingGroupIndex, 1, group);
		} else {
			group.id = group.name.toLowerCase();
			groups.push(group);
		}

		_storeGroups(groups);
		return groups;
	}

	function deleteGroups(idList){
		console.log('Deleted the group(s) form the DB via AJAX Call');
		for (var i = 0; i < idList.length; i++) {
			_.remove(groups, {id: idList[i] });
		}

		if(groups.length === 0){
			localStorage.removeItem('groups');
		} else {
			_storeGroups(groups);
		}

		return groups;
	}

	return {
		getAllGroups: getAllGroups,
		saveGroup: saveGroup,
		deleteGroups: deleteGroups
	};
}();

module.exports = GroupService;